import React, { useState } from 'react';
import { createGroupChat } from '../apis/chat';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addChat } from '../store/reducers/chatSlice';

type GroupChatModalProps = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

export const GroupChatModal: React.FC<GroupChatModalProps> = ({ isModalOpen, toggleModal }) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const dispatch = useAppDispatch();
  const recipientList = useAppSelector((state)=> state.chat.recipientList);
  const [groupAvatar, setGroupAvatar] = useState<File | null>(null);
  const [groupAvatarPreview, setGroupAvatarPreview] = useState<string | ArrayBuffer | null >(null);
  
  const handleGroupAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; 
    if (file) {
      setGroupAvatar(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setGroupAvatarPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUserSelection = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleCreateGroupChat = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!groupName || selectedUserIds.length === 0) {
      alert('Please provide a group name and select at least one user.');
      return;
    }
  
    const formData = new FormData();
    formData.append("name", groupName);
    selectedUserIds.forEach((id) => formData.append("userIds[]", id));
    if (groupAvatar) {
      formData.append("avatar", groupAvatar); 
    }
  
    try {
      const res = await createGroupChat(formData);
      dispatch(addChat(res.data));
      toggleModal();
    } catch (error: any) {
      console.error("Failed to create group chat", error);
      alert("Failed to create group chat. Please try again.");
    }
  };
  

  return (
    isModalOpen && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <h2 className="text-lg font-bold mb-4">Create Group Chat</h2>
          <form onSubmit={handleCreateGroupChat}>
            {/* Group Name Input */}
            <label className="block text-gray-700 mb-4">
              Group Name:
              <input
                type="text"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded"
                placeholder="Enter group name"
              />
            </label>
            <label className="block text-gray-700 mb-4">
              Group Avatar:
              <input
                type="file"
                accept="image/*"
                onChange={handleGroupAvatarUpload}
                className="mt-1 block w-full text-sm text-gray-500
                          file:mr-4 file:py-2 file:px-4
                          file:rounded file:border-0
                          file:text-sm file:font-semibold
                          file:bg-blue-50 file:text-blue-700
                          hover:file:bg-blue-100"
              />
             {groupAvatarPreview && typeof groupAvatarPreview === 'string' && (
                <img
                  src={groupAvatarPreview}
                  alt="Group Avatar Preview"
                  className="mt-2 w-16 h-16 rounded-full"
                />
              )}
            </label>

            <div className="mb-4 max-h-40 overflow-y-auto border border-gray-300 rounded p-2">
              <p className="font-semibold mb-2">Select Users:</p>
              {recipientList.map((recipient) => (
                <label
                  key={recipient._id}
                  className="flex items-center space-x-3 text-gray-700 mb-2"
                >
                  <input
                    type="checkbox"
                    value={recipient._id}
                    checked={selectedUserIds.includes(recipient._id)}
                    onChange={() => handleUserSelection(recipient._id)}
                    className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  {/* Avatar */}
                  <img
                    src={recipient.avatarUrl || '/default-avatar.png'}
                    alt={`${recipient.username}'s avatar`}
                    className="w-8 h-8 rounded-full"
                  />
                  {/* Username and Email */}
                  <span>
                    {recipient.username} ({recipient?.email})
                  </span>
                </label>
              ))}
            </div>
      
            {/* Action Buttons */}
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
                Create Group
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
};
