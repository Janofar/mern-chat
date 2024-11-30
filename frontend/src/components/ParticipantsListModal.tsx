import React from 'react';
import { User } from '../store/types';

interface ParticipantsModalProps {
  show: boolean;
  onClose: () => void;
  participants: User[];
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({ show, onClose, participants }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-lg font-semibold">Participants</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            &times;
          </button>
        </div>
        <ul className="mt-4 space-y-4">
          {participants.map((participant) => (
            <li key={participant._id} className="flex items-center space-x-4">
              <img
                src={participant.avatarUrl || 'https://via.placeholder.com/40'}
                alt={participant.username}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-medium">{participant.username}</p>
                <p className={`text-xs ${participant.isOnline ? 'text-green-500' : 'text-gray-400'}`}>
                  {participant.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ParticipantsModal;
