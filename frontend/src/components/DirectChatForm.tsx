import { useState } from "react";

type DirectChatFormProps = {
    onSubmit: (email: string) => void;
    onClose: () => void;
  };
  
  export const DirectChatForm: React.FC<DirectChatFormProps> = ({ onSubmit, onClose }) => {
    const [email, setEmail] = useState<string>("");
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(email);
    };
  
    return (
      <form onSubmit={handleSubmit}>
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
            onClick={onClose}
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
    );
  };
  