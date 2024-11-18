
import Chat, { IChat } from '../models/Chat';
import Message from '../models/Message';
import mongoose, { Types } from 'mongoose';

export const createGroupChat = async (name: string, userIds: Types.ObjectId[]) => {
  const chat = await Chat.create({ name, isGroupChat: true, users: userIds });
  return chat;
};

export const getAllChatsForUser = async (userId: mongoose.Types.ObjectId) => {
  const chats = await Chat.find({ users: userId })
    .populate({
      path: 'users',
      select: 'username isOnline avatar',
    })
    .populate({
      path: 'latestMessage',
      select: 'content sender',
      populate: {
        path: 'sender',
        select: 'username avatar',
      },
    })
    .lean()
    .exec();

  const chatsWithEmptyMessages = chats.map(chat => ({
    _id: chat._id.toString(),
    name: chat.name,
    isGroupChat: chat.isGroupChat,
    users: chat.users.map((user: any) => ({
      id: user._id.toString(),
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      isOnline: user.isOnline,
    })),
    receiver: !chat.isGroupChat ?
      chat.users.find((user: any) => user._id.toString() !== userId.toString()) : undefined,
    latestMessage: chat.latestMessage,
    messages: [],
  }));

  return chatsWithEmptyMessages;
};

export const getChatHistory = async (chatId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) => {
  try {
    const chat: any = await Chat.findById(chatId)
      .populate({
        path: 'users',
        select: 'username isOnline avatar',
      })
      .populate({
        path: 'latestMessage',
        select: 'content sender',
        populate: {
          path: 'sender',
          select: 'username avatar',
        },
      })
      .lean()
      .exec();

    let receiver: any;
    if (!chat.isGroupChat) {
      receiver = chat.users.find((user: any) => user._id.toString() !== userId.toString());
    }

    const messages = await Message
      .find({ chat: chat._id })
      .sort({ createdAt: 1 })
      .populate({
        path: 'sender',
        select: 'username isOnline avatar',
      })
      .lean()
      .exec();

    const mappedMessages = messages.map((message: any) => ({
      _id: message._id.toString(),
      sender: {
        id: message.sender._id.toString(),
        username: message.sender.username,
        avatar: message.sender.avatar,
        isOnline: message.sender.isOnline,
      },
      receiver: {
        id: receiver._id.toString(),
        username: receiver.username,
        avatar: receiver.avatar,
        isOnline: receiver.isOnline,
      },
      isGroupChat: chat.isGroupChat,
      timeStamp: message.createdAt.toString(),
      content: message.content,
      createdAt: message.createdAt.toISOString(),
    }));

    return {
      sender: {
        _id: chat.latestMessage?.sender._id.toString(),
        username: chat.latestMessage?.sender.username,
        avatar: chat.latestMessage?.sender.avatar,
        isOnline: chat.latestMessage?.sender.isOnline,
      },
      messages: mappedMessages,
    };

  } catch (error) {
    throw new Error('Failed to retrieve chat history');
  }
};


export const createDirectChat = async (senderId: Types.ObjectId, receiverId: Types.ObjectId) => {
  try {
    const existingChat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [senderId, receiverId] },
    });

    if (existingChat) {
      return existingChat;
    }

    const newChat = new Chat({
      isGroupChat: false,
      users: [senderId, receiverId],
      latestMessage: null,
    });

    const savedChat = await newChat.save();

    return savedChat;
  } catch (error) {
    throw new Error('Failed to create chat room');
  }
};
