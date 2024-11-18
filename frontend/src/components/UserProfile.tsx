import { PlusIcon } from 'lucide-react';
import React, { useState } from 'react';
import { createDirectChat } from '../apis/chat';

type UserProfileProps = {
  image: string;
  name: string;
  isOnline: boolean;
};


const UserProfile: React.FC<UserProfileProps> = ({ image, name, isOnline }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const toggleModal = () => setIsModalOpen((prev) => !prev);
  const handleCreateDirectChat = (e: React.FormEvent) => {
    e.preventDefault();
    createDirectChat(email);
    setIsModalOpen(false);
  };



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

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Add New Contact</h2>
            <p>Enter the details for the new contact:</p>
            <form onSubmit={handleCreateDirectChat}>
              <label className="block text-gray-700 mb-2">
                Email:
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 p-2 w-full border border-gray-300 rounded"
                  placeholder="Enter email address"
                />
              </label>
              <div className="flex justify-end space-x-2 mt-4">
                <button
                  type="button"
                  onClick={toggleModal}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

