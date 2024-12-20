export interface User {
    _id: string;
    username: string;
    avatarUrl: string; 
    isOnline: boolean;
  }
  
export interface UserInput  {
  username: string;
  email : string;
  password : string;
  avatar: string; 
}