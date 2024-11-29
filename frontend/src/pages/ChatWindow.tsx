import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import UserProfile from '../components/UserProfile';
import ChatList from '../components/ChatList';
import ChatHeader from '../components/ChatHeader';
import ChatMessage from '../components/ChatMessage';
import MessageInput from '../components/MessageInput';
import WebSocketService from '../socket/webSocketService';
import { getAllChatsForUser } from '../apis/chat';
import { addChatMessage, setChatsForUser, setRecipientList, updateLatestChatMessage } from '../store/reducers/chatSlice';
import { ChatDataForUI, MessageState, User } from '../store/types';

const ChatWindow: React.FC = () => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const chats = useAppSelector((state) => state.chat.chats);
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const messages = useAppSelector((state) => state.chat.selectedChat.messages);

  const dispatch = useAppDispatch();
  const fetchChats = async () => {
    const response = await getAllChatsForUser();
    const chats: ChatDataForUI[] = response;
    const receivers = response
    .filter((res) => res.receiver)
    .map((res) => res.receiver) || [];
    dispatch(setChatsForUser(chats));
    if (receivers.length) {
      const validReceivers = receivers.filter((receiver): receiver is User => receiver !== undefined);
      dispatch(setRecipientList(validReceivers));
    }
    
  };
  useEffect(() => {
    fetchChats()
  }, [])

  useEffect(() => {

    WebSocketService.connect('http://localhost:5000');

    WebSocketService.on('messageReceived', (message: MessageState) => {
      if (currentUser._id != message.sender._id) {
        dispatch(addChatMessage(message));
      }
      dispatch(updateLatestChatMessage(message));
    });

    return () => {
      WebSocketService.disconnect();
    };
  }, []);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200">
        <UserProfile
          image={currentUser.avatarUrl}
          name={currentUser.username}
          isOnline={currentUser.isOnline}
        />
        <ChatList
          chats={chats}
          selectedChatId={selectedChat._id || ''}
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedChat._id && (
          <>
            <ChatHeader
           image={
            !selectedChat.isGroupChat 
                ? (selectedChat.receiver?.avatarUrl || "default-avatar-url.jpg") 
                : (selectedChat.groupAvatarUrl || "default-avatar-url.jpg")
            }
              name={selectedChat.name ? selectedChat.name : selectedChat.receiver ?
                selectedChat.receiver.username : ''}
              status="Last seen 5m ago"
              isGroupChat={selectedChat.isGroupChat}
              participantCount={selectedChat.isGroupChat ? selectedChat.otherParticipants?.length : undefined}
            />

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
              {messages.length > 0 && messages.map((message) => {
                return (
                  <ChatMessage
                    key={message._id}
                    content={message.content}
                    timestamp={message.timestamp}
                    isGroupChat={message.isGroupChat}
                    sender={message.sender}
                    receiver={message.receiver}
                  />
                )
              })}
            </div>

            <MessageInput chatId={selectedChat._id} />
          </>
        )}
      </div>
    </div>
  );
};

export default ChatWindow;