import * as messageService from '../services/messageService';
import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const saveMessage = async (req: Request, res: Response) => {
    const { chatId } = req.params;
    const { content, sender } = req.body;

    const senderId = new mongoose.Types.ObjectId(sender._id);
    const chatObjectId = new mongoose.Types.ObjectId(chatId);

    try {
        const message = await messageService.saveMessage(senderId, chatObjectId, content);
        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: 'Failed to send message', error });
    }
};

export const getChatMessages = async ({ params: { chatId } }: Request, res: Response) => {
    try {
        const chatObjectId = new mongoose.Types.ObjectId(chatId);
        const messages = await messageService.getChatMessages(chatObjectId);
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get messages', error });
    }
};