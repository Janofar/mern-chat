 import { UserPlus, Users } from 'lucide-react';
import React, {useState } from 'react';
import {Modal} from './common/Modal';
import { GroupChatForm } from './GroupChatForm';
import { DirectChatForm } from './DirectChatForm';
import { createDirectChat, createGroupChat } from '../apis/chat';
import { useAppDispatch } from '../store/hooks';
import { addChat, addRecipientList } from '../store/reducers/chatSlice';

type UserProfileProps = {
  image: string;
  name: string;
  isOnline: boolean;
};


const UserProfile: React.FC<UserProfileProps> = ({ image, name, isOnline }) => {
  const dispatch = useAppDispatch();
  const [isDirectChatOpen, setIsDirectModalOpen] = useState<boolean>(false);
  const [isGroupChatOpen, setIsGroupModalOpen] = useState<boolean>(false);

  const toggleDirectChatModal = () => setIsDirectModalOpen((prev) => !prev);
  const toggleGroupChatModal = () => setIsGroupModalOpen((prev) => !prev);
 

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
            onClick={toggleDirectChatModal}
            title="Add Direct Chat"
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
          >
            <UserPlus className="w-5 h-5 text-gray-600" />
          </button>
          <button
            onClick={toggleGroupChatModal}
            className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
            title="Add Group Chat"
          >
            <Users className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
      <Modal isOpen={isDirectChatOpen} onClose={toggleDirectChatModal} title="Add New Contact">
        <DirectChatForm
          onSubmit={(email) => {
            createDirectChat(email).then((res) => {
              dispatch(addChat(res.data));
              dispatch(addRecipientList(res.data.receiver));
              toggleDirectChatModal();
            });
          }}
          onClose={toggleDirectChatModal}
        />
      </Modal>

      <Modal isOpen={isGroupChatOpen} onClose={toggleGroupChatModal} title="Create Group Chat">
        <GroupChatForm
          onSubmit={(data) => {
            const formData = new FormData();
            formData.append("name", data.groupName);
            data.userIds.forEach((id) => formData.append("userIds[]", id));
            if (data.avatar) formData.append("avatar", data.avatar);

            createGroupChat(formData).then((res) => {
              dispatch(addChat(res.data));
              toggleGroupChatModal();
            });
          }}
          onClose={toggleGroupChatModal}
        />
      </Modal>
    </div>
  );
};

export default UserProfile;

