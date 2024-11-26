export interface User {
  _id: string;
  username: string;
  avatar: string;
  isOnline: boolean;
}

export interface MessageState {
  _id : string,
  sender : User,
  content : string,
  receiver ?: User,
  otherParticipants ?:User[],
  chatId : string,
  isGroupChat : boolean,
  timestamp : string,
}

export interface ChatDataForUI{
  _id: string;
  name?: string;
  isGroupChat: boolean;
  users: User[];
  latestMessage?:MessageState;
  groupAdmins?: User[];
  currentUser ?: User,
  receiver ?: User,
  otherParticipants ?: User[];
  messages : MessageState[];
  unreadCount ?: number;
  timestamp ?:string;
}

export interface ChatState {
  chats: ChatDataForUI[];
  selectedChat : ChatDataForUI;
}