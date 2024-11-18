import User from '../models/User';
import { Request, Response, NextFunction } from 'express';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';

dotenv.config();

export const findUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    throw new Error('Failed to find user by email');
  }
};


const JWT_SECRET = process.env.JWT_SECRET;

export const authenticateUser = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('User not found.');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid credentials.');
  }

  const token = jwt.sign({ _id: user._id }, JWT_SECRET as string, { expiresIn: '1h' });

  return { user : {
    _id : user._id,
    username : user.username,
    avatar : user.avatar,
    isOnline : user.isOnline,
    lastSeen : user.lastSeen,

  }, token };
};



