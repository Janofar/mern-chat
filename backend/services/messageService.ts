import Message from '../models/Message';
import Chat, { IChat } from '../models/Chat';
import { Types } from 'mongoose';
import { UserDTO } from '../types/user';
import { ChatDTO } from '../types/chat';
import { MessageDTO } from '../types/message';

export const saveMessage = async (senderId: Types.ObjectId, chatId: Types.ObjectId, content: string) => {
  let message = await Message.create({ sender: senderId, chat: chatId, content });

  message = await message.populate([
    { path: 'chat' },
    { path: 'sender', select: 'username avatar avatarUrl isOnline' },
  ])
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });
    const chat : ChatDTO = message.chat;
    const sender : UserDTO = message.sender;

    let receiver: UserDTO | null = null;
    let otherParticipants: UserDTO[] = [];

    if (!chat.isGroupChat) {
      receiver = chat.users.find(
        (user: UserDTO) => user._id.toString() !== senderId.toString()
      ) || null;
    } else {
      otherParticipants = chat.users.filter(
        (user: UserDTO) => user._id.toString() !== senderId.toString()
      );
    }

    return {
      _id: message._id.toString(),
      sender: {
        _id: sender._id.toString(),
        username: sender.username,
        avatarUrl: sender.avatarUrl,
        isOnline: sender.isOnline,
      },
      receiver,
      otherParticipants,
      isGroupChat: chat.isGroupChat,
      timeStamp: message.createdAt.toISOString(),
      content: message.content,
      createdAt: message.createdAt.toISOString(),
    };
};

export const getChatMessages = async (chatId: Types.ObjectId) => {
    return await Message.find({ chat: chatId })
    .populate('sender', 'username avatar')
    .populate('chat', 'name isGroupChat');
};

export const getRecentChatMessages = async (chatId: Types.ObjectId, limit: number = 1, userId: Types.ObjectId) => {
    const chat = await Chat.findById(chatId)
      .populate({
        path: 'users',
        select: 'username isOnline avatar',
      })
      .populate('latestMessage')
      .lean()
      .exec();
  
    if (!chat) {
      throw new Error('Chat not found');
    }
  
    let receiver: any;
    if (!chat.isGroupChat) {
      receiver = chat.users.find((user: any) => user._id.toString() !== userId.toString());
    }
  
    const messages = await Message.find({ chat: chatId })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate({
        path: 'sender',
        select: 'username avatar isOnline',
      })
      .lean()
      .exec();
  
    const formattedMessages = messages.map((message: any) => ({
      _id: message._id.toString(),
      sender: {
        id: message.sender._id.toString(),
        username: message.sender.username,
        avatar: message.sender.avatar,
        isOnline: message.sender.isOnline,
      },
      receiver: receiver
        ? {
            id: receiver._id.toString(),
            username: receiver.username,
            avatar: receiver.avatar,
            isOnline: receiver.isOnline,
          }
        : null,
      isGroupChat: chat.isGroupChat,
      timeStamp: message.createdAt.toString(),
      content: message.content,
      createdAt: message.createdAt.toISOString(),
    }));
  
    return {
      _id: chat._id.toString(),
      name: chat.name,
      isGroupChat: chat.isGroupChat,
      users: chat.users.map((user: any) => ({
        id: user._id.toString(),
        username: user.username,
        avatar: user.avatar,
        isOnline: user.isOnline,
      })),
      latestMessage: chat.latestMessage,
      messages: formattedMessages,
    };
  };
  
  