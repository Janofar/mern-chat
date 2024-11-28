import User from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import { UserInput } from '../types/user';

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

  return {
    user : {
    _id : user._id,
    username : user.username,
    avatarUrl : user.avatarUrl,
    isOnline : user.isOnline,
    lastSeen : user.lastSeen,
  }, token };
};

export const getAllUsers = async () => {
  try {
    const users = await User.find({}, { password: 0 }).exec();
    return users;
  } catch (error) {
    console.error('Error fetching users in service:', error);
    throw new Error('Failed to fetch users');
  }
};

export const createUser = async (userInput: UserInput) => {
  const { username, email, password, avatar } = userInput;

  // Check if the user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = new User({
    username,
    email,
    password: hashedPassword,
    avatar,
  });

  return user.save();
};

