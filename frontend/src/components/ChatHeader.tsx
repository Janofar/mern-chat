import React, { useState } from 'react';
import { Phone, Video, MoreHorizontal } from 'lucide-react';
import ParticipantsModal from './ParticipantsListModal';
import { User } from '../store/types';
import { useAppSelector } from '../store/hooks';

type ChatHeaderProps = {
  image: string;
  name: string;
  status: string;
  isGroupChat: boolean;
  participants?: User[];
};
const ChatHeader: React.FC<ChatHeaderProps> = ({ image, name, status, isGroupChat, participants }) => {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const [isParticipantModalOpen, setIsParticipantModalOpen] = useState<boolean>(false);

  const toggleParticipantModal = () => setIsParticipantModalOpen((prev) => !prev);
  return (
    <div className="p-4 bg-white border-b border-gray-200 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={image}
            alt={name}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div onClick={isGroupChat ? () => setIsParticipantModalOpen(true) : undefined}>
            <h2 className="font-semibold text-gray-800">{name}</h2>
            {isGroupChat ? (
              <span className="text-sm text-gray-500">{participants?.length} participants</span>
            ) : (
              <span className="text-sm text-gray-500">{status}</span>
            )}
          </div>
        </div>
        {isGroupChat && <ParticipantsModal
          show={isParticipantModalOpen}
          onClose={toggleParticipantModal}
          participants={[...(participants || []), currentUser]}
        />}
        {/* <div className="flex items-center space-x-4">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Phone className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <Video className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <MoreHorizontal className="w-5 h-5 text-gray-600" />
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default ChatHeader;