interface Participant {
    _id: string;
    username: string;
    avatarUrl?: string;
    isOnline: boolean;
  }
  
  interface ParticipantsContentProps {
    participants: Participant[];
  }
  
  const ParticipantsContent: React.FC<ParticipantsContentProps> = ({ participants }) => {
    return (
      <ul className="mt-4 space-y-4">
        {participants.map((participant) => (
          <li key={participant._id} className="flex items-center space-x-4">
            <img
              src={participant.avatarUrl || "https://via.placeholder.com/40"}
              alt={participant.username}
              className="w-10 h-10 rounded-full"
            />
            <div>
              <p className="text-sm font-medium">{participant.username}</p>
              <p
                className={`text-xs ${
                  participant.isOnline ? "text-green-500" : "text-gray-400"
                }`}
              >
                {/* {participant.isOnline ? "Online" : "Offline"} */}
              </p>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  
  export default ParticipantsContent;
  