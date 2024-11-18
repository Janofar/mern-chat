import { UserDTO } from "./user";

export interface MessageDTO {
    id: string;
    sender: UserDTO;
    content: string;
    createdAt: string;
  }
  