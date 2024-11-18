import axios from "axios";
import { User } from "../store/types";


const apiUrl = 'http://localhost:5000/api';

export const createUser = async (userData: User): Promise<void> => {
  try {
    await axios.post(`${apiUrl}/`, userData);

  } catch (error) {
    console.error('Error creating user:', error);
  }
};

const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${apiUrl}/login`, {
      email,
      password,
    }, {
      withCredentials: true,
    });

    return response.data
  } catch (error: any) {
    console.error('Login failed:', error.response?.data?.message || error.message);
  }
};

export default loginUser;


