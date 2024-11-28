export interface UserDTO {
    _id: string;
    username: string;
    avatar: string; 
    isOnline: boolean;
  }
  
export interface UserInput  {
  username: string;
  email : string;
  password : string;
  avatar: string; 
}