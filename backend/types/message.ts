import { User } from "./user";

export interface Message {
    _id : string;
    sender : User;
    content : string;
    chatId : string;
    isGroupChat : boolean;
    timeStamp : String;
  }
  