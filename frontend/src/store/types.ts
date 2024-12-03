export interface User {
  _id: string;
  username: string;
  avatarUrl: string;
  isOnline: boolean;
  email : string;
}

export interface MessageState {
  _id : string,
  sender : User,
  content : string,
  chatId : string,
  isGroupChat : boolean,
  timeStamp : Date,
}

export interface ChatDataForUI{
  _id: string;
  name?: string;
  isGroupChat: boolean;
  groupAvatarUrl ?: string;
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
  recipientList : User[];
}