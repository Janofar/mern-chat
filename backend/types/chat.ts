import { MessageDTO } from "./message";
import { UserDTO } from "./user";

export interface ChatDTO {
    id: string; 
    name?: string; 
    isGroupChat: boolean;
    latestMessage?: MessageDTO;
    groupAdmins?: UserDTO[];
    currentUser?: UserDTO;
    receiver?: UserDTO;
    messages?: MessageDTO[];
    unreadCount?: number;
    timestamp?: string;
  }
  