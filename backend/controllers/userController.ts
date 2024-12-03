import { Request, Response } from 'express';
import { authenticateUser, createUser  } from '../services/userService';
import * as dotenv from 'dotenv';
import { uploadAvatar } from '../utils/uploads';
import path from 'path';

dotenv.config();
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


export const registerUser = async (req: Request, res: Response) => {
  uploadAvatar.single("avatar")(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err.message });
    }

    const { username, email, password } = req.body;
    const avatar = req.file ? path.normalize(req.file.path).replace(/\\/g, '/') : '';
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      const user = await createUser({ username, email, password, avatar });

      res.status(201).json({
        message: "User registered successfully",
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });
};




