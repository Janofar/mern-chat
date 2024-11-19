import React, { useState } from 'react'
import { createDirectChat } from '../apis/chat';
import { useAppDispatch } from '../store/hooks';
import { addChat } from '../store/reducers/chatSlice';

type DirectChatModalProps = {
     isModalOpen : boolean,
     toggleModal: () => void;
};

export const DirectChatModal: React.FC<DirectChatModalProps> = ({isModalOpen,toggleModal }) => {
    const [email, setEmail] = useState<string>('');
    const dispatch = useAppDispatch();

    const handleCreateDirectChat = (e: React.FormEvent) => {
        e.preventDefault();
        createDirectChat(email).then((res) => {
            dispatch(addChat(res.data))
        });
        toggleModal()
    };
    return isModalOpen && (
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
    )
}
