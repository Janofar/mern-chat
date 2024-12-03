 import { UserPlus, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { DirectChatModal } from './DirectChatModal';
import { GroupChatModal } from './GroupChatModal';

type UserProfileProps = {
  image: string;
  name: string;
  isOnline: boolean;
};


const UserProfile: React.FC<UserProfileProps> = ({ image, name, isOnline }) => {
  const [isDirectModalOpen, setIsDirectModalOpen] = useState<boolean>(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState<boolean>(false);

  const toggleDirectModal = () => setIsDirectModalOpen((prev) => !prev);
  const toggleGroupModal = () => setIsGroupModalOpen((prev) => !prev);
 

  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center space-x-4">
          <img
            src={image}
            alt={name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-gray-800">{name}</h2>
            {/* {isOnline ? <span className="text-sm text-green-500">Online</span> :
              <span className="text-sm text-green-500">Offline</span>} */}

          </div>
        </div>
        <div className='flex space-x-4'>
          <button
            onClick={toggleDirectModal}
            title="Add Direct Chat"
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <UserPlus className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={toggleGroupModal}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            title="Add Group Chat"
          >
            <Users className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
        <GroupChatModal isModalOpen={isGroupModalOpen} toggleModal={toggleGroupModal}/>
        <DirectChatModal isModalOpen={isDirectModalOpen} toggleModal={toggleDirectModal}/>
    </div>
  );
};

export default UserProfile;

