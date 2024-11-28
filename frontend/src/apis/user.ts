import axios from "axios";

const apiUrl = 'http://localhost:5000/api';

export const createUser = async (userData: FormData): Promise<void> => {
  try {
    await axios.post(`${apiUrl}/register`, userData,{
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

  } catch (error) {
    console.error('Error creating user:', error);
  }
};

export const loginUser = async (email: string, password: string) => {
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


