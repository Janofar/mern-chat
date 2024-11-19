import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import { DirectChatModal } from './DirectChatModal';

type UserProfileProps = {
  image: string;
  name: string;
  isOnline: boolean;
};


const UserProfile: React.FC<UserProfileProps> = ({ image, name, isOnline }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => setIsModalOpen((prev) => !prev);
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
            {isOnline ? <span className="text-sm text-green-500">Online</span> :
              <span className="text-sm text-green-500">Offline</span>}

          </div>
        </div>
        <button
          onClick={toggleModal}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <PlusIcon className="w-5 h-5 text-gray-600" />
        </button>
      </div>

        <DirectChatModal isModalOpen={isModalOpen} toggleModal={toggleModal}/>
    </div>
  );
};

export default UserProfile;

