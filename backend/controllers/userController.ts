import { Request, Response } from 'express';
import { authenticateUser } from '../services/userService';
import * as dotenv from 'dotenv';

dotenv.config();
// export const setUserOnline = async (req: Request, res: Response) => {
//   const { userId, status } = req.body;
//   try {
//     await updateOnlineStatus(userId, status);
//     res.status(200).json({ message: 'User status updated successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to update user status', error });
//   }
// };

// export const checkUserOnlineStatus = async (req: Request, res: Response) => {
//   const { userId } = req.params;
//   try {
//     const isOnline = await getOnlineStatus(userId);
//     res.status(200).json({ userId, isOnline });
//   } catch (error) {
//     res.status(500).json({ message: 'Failed to get user status', error });
//   }
// };


export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const { user, token } = await authenticateUser(email, password);

    res.cookie('authToken', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
      path: '/',
    });

    res.status(200).json({ message: 'Login successful.', user });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('authToken');
  res.status(200).json({ message: 'Logged out successfully.' });
};






