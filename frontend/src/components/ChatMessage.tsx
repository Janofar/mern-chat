import React from 'react';

type MessageProps = {
  content: string;
  timestamp: string;
  sender: {
    _id: string,
    username: string,
    avatarUrl: string,
    isOnline: boolean,
  };
  receiver?: {
    _id: string,
    username: string,
    avatarUrl: string,
    isOnline: boolean,
  };
  isGroupChat: boolean;
};

const ChatMessage: React.FC<MessageProps> = React.memo(({ content, timestamp, isGroupChat, sender }) => {
  return (
    <div className={`flex items-start space-x-2 ${isGroupChat ? 'justify-end' : ''}`}>
      {sender && (
        <img
          src={sender.avatarUrl || "default-avatar.png"}
          alt={sender.username || "User Avatar"}
          className="w-8 h-8 rounded-full object-cover"
        />
      )}
      <div
        className={`p-3 rounded-lg max-w-md ${isGroupChat
          ? 'bg-blue-500 text-white rounded-tr-none'
          : 'bg-white text-gray-800 rounded-tl-none'
          }`}
      >
        {!isGroupChat && (
          <p className="text-xs font-medium text-gray-600 mb-1">{sender?.username}</p>
        )}
        <p>{content}</p>
        <span
          className={`text-xs ${isGroupChat ? 'text-blue-100' : 'text-gray-400'
            } mt-1`}
        >
          {timestamp}
        </span>
      </div>
    </div>
  )
});

export default ChatMessage;