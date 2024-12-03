import { useState } from "react";
import { useAppSelector } from "../store/hooks";

type GroupChatFormProps = {
    onSubmit: (data: { groupName: string; userIds: string[]; avatar?: File }) => void;
    onClose: () => void;
  };
  
  export const GroupChatForm: React.FC<GroupChatFormProps> = ({ onSubmit, onClose }) => {
    const [groupName, setGroupName] = useState<string>("");
    const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
    const [groupAvatar, setGroupAvatar] = useState<File | null>(null);
    const [groupAvatarPreview, setGroupAvatarPreview] = useState<string | null>(null);
    const recipientList = useAppSelector((state) => state.chat.recipientList);
  
    const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        setGroupAvatar(file);
        const reader = new FileReader();
        reader.onloadend = () => setGroupAvatarPreview(reader.result as string);
        reader.readAsDataURL(file);
      }
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit({ groupName, userIds: selectedUserIds, avatar: groupAvatar || undefined });
    };
  
    const toggleUserSelection = (userId: string) => {
      setSelectedUserIds((prev) =>
        prev.includes(userId) ? prev.filter((id) => id !== userId) : [...prev, userId]
      );
    };
  
    return (
      <form onSubmit={handleSubmit}>
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
            onChange={handleAvatarUpload}
            className="mt-1 block w-full text-sm text-gray-500"
          />
          {groupAvatarPreview && (
            <img
              src={groupAvatarPreview}
              alt="Avatar Preview"
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
                onChange={() => toggleUserSelection(recipient._id)}
                className="mr-2 h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <img
                src={recipient.avatarUrl || "/default-avatar.png"}
                alt={`${recipient.username}'s avatar`}
                className="w-8 h-8 rounded-full"
              />
              <span>
                {recipient.username} ({recipient.email})
              </span>
            </label>
          ))}
        </div>
        <div className="flex justify-end space-x-2 mt-4">
          <button
            type="button"
            onClick={onClose}
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
    );
  };
  