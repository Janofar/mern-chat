import { Message } from "./message";
import { User } from "./user";

export interface ChatDTO {
    _id: string; 
    name?: string; 
    isGroupChat: boolean;
    groupAvatarUrl : string | null;
    latestMessage?: Message | null;
    groupAdmins?: User[];
    currentUser?: User;
    receiver?: User | null;
    otherParticipants ?: User[] | null;
    messages?: Message[] | [];
    unreadCount?: number;
    timestamp?: string;
  }

export interface ChatData {
  _id : string;
  name: string;
  isGroupChat: boolean;
  users: User[];
  latestMessage?: Message;
  groupAdmins?: User[];
  groupAvatar?: string;
}