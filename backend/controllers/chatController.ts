import { Request, Response } from 'express';
import * as chatService from '../services/chatService';
import * as userService from '../services/userService';
import mongoose, { Types } from 'mongoose';
import { uploadGrpAvatar } from '../utils/uploads';
import path from 'path';

export const createGroupChat = async (req: Request, res: Response) => {
  uploadGrpAvatar.single("avatar")(req, res, async (err) => {
    const { name, userIds } = req.body;
    const avatar = req.file ? path.normalize(req.file.path).replace(/\\/g, '/') : '';
    try {
      const chat = await chatService.createGroupChat(name, req.user?._id, userIds,avatar);
      res.status(201).json(chat);
    } catch (error) {
      res.status(500).json({ message: 'Failed to create chat', error });
    }
  });
}

export const getAllChats = async (req: Request, res: Response) => {
  const userId = new mongoose.Types.ObjectId(req.user?._id);

  try {
    const chats = await chatService.getAllChatsForUser(userId);

    res.status(200).json(chats);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get chats', error });
  }
};

export const fetchChatHistory = async (req: Request, res: Response): Promise<any> => {
  const { chatId } = req.params;
  const userId = new mongoose.Types.ObjectId(req.user?._id);
  if (!mongoose.Types.ObjectId.isValid(chatId)) {
    return res.status(400).json({ message: 'Invalid chat ID' });
  }

  try {
    const chatObjectId = new mongoose.Types.ObjectId(chatId);
    const messages = await chatService.getChatHistory(chatObjectId, userId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to retrieve chat history', error });
  }
};

export const createDirectChat = async (req: Request, res: Response): Promise<any> => {
  const { email, } = req.body;

  try {
    const user = await userService.findUserByEmail(email);

    if (!user) {
      return res.status(404).json({ message: 'User does not exist' });
    }
    //sender should be from req.user
    const senderId = new mongoose.Types.ObjectId(req.user?._id);

    const receiverId = new mongoose.Types.ObjectId(user._id as mongoose.Types.ObjectId);
    const chat = await chatService.createDirectChat(senderId, receiverId);
    res.status(201).json(chat);

  } catch (error) {
    res.status(500).json({ message: 'Failed to create chat', error });
  }
};

