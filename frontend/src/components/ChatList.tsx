import React from 'react';
import { useAppDispatch } from '../store/hooks';
import { setSelectedChat, updateChatMessages } from '../store/reducers/chatSlice';
import type { ChatDataForUI } from '../store/types';
import webSocketService from '../socket/webSocketService';
import { getChatHistory} from '../apis/chat';

type ChatListProps = {
  chats: ChatDataForUI[];
  selectedChatId: string;
};

const ChatList: React.FC<ChatListProps> = ({ chats , selectedChatId }) => {
  const dispatch = useAppDispatch();

  const handleSelectChat = (chat: ChatDataForUI) => {
    dispatch(setSelectedChat(chat));
  
    getChatHistory(chat._id)
      .then((res) => {
        dispatch(updateChatMessages(res.messages));
        webSocketService.emit('joinChat', { chatId: chat._id });
      })
      .catch((error) => {
        console.error('Error selecting chat:', error);
      });
  };  


  return (
    <div className="overflow-y-auto h-[calc(100vh-88px)]">
      {chats?.length > 0 && chats.map((chat,index) => (
        <div
          key={index}
          onClick={() =>handleSelectChat(chat)}
          className={`p-4 hover:bg-gray-50 cursor-pointer ${
            chat._id === selectedChatId ? 'bg-blue-50' : ''
          }`}
        >
          <div className="flex items-center space-x-3">
            <div className="relative">
            <img
                src={chat.receiver?.avatarUrl || "default-avatar-url.jpg"}
                alt={chat.name || chat.receiver?.username}
                className="w-10 h-10 rounded-full object-cover"
              />

              {chat.isGroupChat && (
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <svg
                    className="w-3 h-3 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              {chat.isGroupChat ? <h3 className="font-medium text-gray-800">{ chat.name}</h3>
              : <h3 className="font-medium text-gray-800">{ chat.receiver?.username}</h3>}
              {chat.latestMessage && <p className="text-sm text-gray-500 truncate">{chat.latestMessage?.content}</p>}
            </div>
            <div className="flex flex-col items-end space-y-1">
              <span className="text-xs text-gray-400">{chat.timestamp}</span>
              {chat.unreadCount && chat.unreadCount > 0 && (
                <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
                  {chat.unreadCount}
                </span>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;