import { MessageDTO } from "./message";
import { UserDTO } from "./user";

export interface ChatDTO {
    _id: string; 
    name?: string; 
    isGroupChat: boolean;
    latestMessage?: MessageDTO;
    groupAdmins?: UserDTO[];
    users : UserDTO[];
    currentUser?: UserDTO;
    receiver?: UserDTO;
    messages?: MessageDTO[];
    unreadCount?: number;
    timestamp?: string;
  }

export interface ChatData {

}
  