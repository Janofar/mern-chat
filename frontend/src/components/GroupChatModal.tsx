import React, { useEffect, useState } from 'react';
import { createGroupChat } from '../apis/chat';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { addChat } from '../store/reducers/chatSlice';
import { User } from '../store/types';


type GroupChatModalProps = {
  isModalOpen: boolean;
  toggleModal: () => void;
};

export const GroupChatModal: React.FC<GroupChatModalProps> = ({ isModalOpen, toggleModal }) => {
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const [groupName, setGroupName] = useState<string>('');
  const dispatch = useAppDispatch();
  const recipientList = useAppSelector((state)=> state.chat.recipientList);

  useEffect(()=>{
    // fetchAllUsers().then((res)=>{
    //     const {users} = res;
    //     const filteredUsers = users.filter((user: any) => user._id !== currenUser._id);
    //     setUserList(filteredUsers);
    // })
  },[])
  const handleUserSelection = (userId: string) => {
    setSelectedUserIds((prev) =>
      prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
    );
  };

  const handleCreateGroupChat = (e: React.FormEvent) => {
    console.log(selectedUserIds,"selected user ids")
    e.preventDefault();
    
    if (!groupName || selectedUserIds.length === 0) {
      alert('Please provide a group name and select at least one user.');
      return;
    }

    createGroupChat({ name :groupName, userIds: selectedUserIds }).then((res) => {
      dispatch(addChat(res.data));
      toggleModal();
    });
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

            {/* User List with Checkboxes */}
            <div className="mb-4 max-h-40 overflow-y-auto border border-gray-300 rounded p-2">
              <p className="font-semibold mb-2">Select Users:</p>
              {recipientList.map((recipient) => (
                <label key={recipient._id} className="block text-gray-700 mb-2">
                  <input
                    type="checkbox"
                    value={recipient._id}
                    checked={selectedUserIds.includes(recipient._id)}
                    onChange={() => handleUserSelection(recipient._id)}
                    className="mr-2"
                  />
                  {recipient.username} ({recipient?.email})
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
