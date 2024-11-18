import React from 'react';
import { Phone, Video, MoreHorizontal } from 'lucide-react';

type ChatHeaderProps = {
  image: string;
  name: string;
  status: string;
  isGroupChat: boolean;
  participantCount?: number;
};

const ChatHeader: React.FC<ChatHeaderProps> = ({ image, name, status, isGroupChat, participantCount }) => (
  <div className="p-4 bg-white border-b border-gray-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <img
          src={image}
          alt={name}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div>
          <h2 className="font-semibold text-gray-800">{name}</h2>
          {isGroupChat ? (
            <span className="text-sm text-gray-500">{participantCount} participants</span>
          ) : (
            <span className="text-sm text-gray-500">{status}</span>
          )}
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Phone className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <Video className="w-5 h-5 text-gray-600" />
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-full">
          <MoreHorizontal className="w-5 h-5 text-gray-600" />
        </button>
      </div>
    </div>
  </div>
);

export default ChatHeader;