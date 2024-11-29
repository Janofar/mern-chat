import React, { useState } from 'react';
import { Send, Paperclip, Smile } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addChatMessage } from '../store/reducers/chatSlice';
import { MessageState } from '../store/types';
import { sendMessage } from '../apis/chat';
import webSocketService from '../socket/webSocketService';

type MessageInputProps = {
  chatId: string;
};

const MessageInput: React.FC<MessageInputProps> = ({ chatId }) => {
  const [message, setMessage] = useState('');
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const selectedChat = useAppSelector((state) => state.chat.selectedChat);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      const newMessage: MessageState = {
        _id: '',
        sender: currentUser,
        receiver: selectedChat.receiver ? {
          _id: selectedChat.receiver._id,
          username: selectedChat.receiver.username,
          avatarUrl: selectedChat.receiver.avatarUrl,
          isOnline: selectedChat.receiver.isOnline,
          email : selectedChat.receiver.email
        } : undefined,
        content: message,
        chatId: selectedChat._id,
        isGroupChat: selectedChat.isGroupChat,
        timestamp: Date.now().toString(),
      };

      sendMessage(newMessage).then(() => {
        dispatch(addChatMessage(newMessage));
        webSocketService.emit('sendMessage', { chatId, message: newMessage });
        setMessage('');
      });

    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-200">
      <div className="flex items-center space-x-4">
        {/* <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
          <Paperclip className="w-5 h-5 text-gray-600" />
        </button> */}
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 p-2 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500"
        />
        {/* <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
          <Smile className="w-5 h-5 text-gray-600" />
        </button> */}
        <button
          type="submit"
          className="p-2 bg-blue-500 hover:bg-blue-600 rounded-full"
        >
          <Send className="w-5 h-5 text-white" />
        </button>
      </div>
    </form>
  );
};

export default MessageInput;