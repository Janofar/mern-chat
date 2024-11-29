import axios from "axios";
import { ChatDataForUI, MessageState } from "../store/types";

const apiUrl = 'http://localhost:5000/api';
axios.defaults.withCredentials = true;

export const createDirectChat = async (email: string): Promise<any> => {
  try {
    return await axios.post(`${apiUrl}/chats/direct`, { email });
  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export const createGroupChat = async (formData:FormData): Promise<any> => {
  try {
   return await axios.post(`${apiUrl}/chats/group`, formData);
  } catch (error) {
    console.error('Error creating user:', error);
  }
};
export const getAllChatsForUser = async (): Promise<ChatDataForUI[]> => {
  try {
    const response = await axios.get(`${apiUrl}/chats/user`, { withCredentials: true });
    return response.data;
  } catch (error) {
    console.error('Error fetching chats:', error);
    return [];
  }
};

export const sendMessage = async (message: MessageState): Promise<void> => {
  try {
    await axios.post(`${apiUrl}/chats/${message.chatId}/message`, message);

  } catch (error) {
    console.error('Error fetching chats:', error);

  }
}

export const getChatHistory = async (chatId: string): Promise<any> => {
  try {
    const response = await axios.get(`${apiUrl}/chats/${chatId}`);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
  }
};