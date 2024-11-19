
import Chat, { IChat } from '../models/Chat';
import Message from '../models/Message';
import mongoose, { Types } from 'mongoose';

export const createGroupChat = async (name: string,loggedinUserId : any, userIds: Types.ObjectId[]) => {
  try { 
    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: userIds },
    }).populate("users", "username email avatar isOnline");

    if (!chat) {
      chat = await Chat.create({
        isGroupChat: false,
        users: userIds,
        latestMessage: null,
        name
      });
      await chat.populate("users", "username email avatar isOnline");
    }

    const chatData = {
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
      otherParticipants: chat.users.find((user: any) => user._id.toString() !== loggedinUserId.toString()),
      latestMessage: chat.latestMessage,
      messages: [],
    };
    return chatData;
  } catch (error : any) {
    throw new Error(`Failed to create or retrieve chat room: ${error.message}`);
  }
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
    let chat = await Chat.findOne({
      isGroupChat: false,
      users: { $all: [senderId, receiverId] },
    }).populate("users", "username email avatar isOnline");

    if (!chat) {
      chat = await Chat.create({
        isGroupChat: false,
        users: [senderId, receiverId],
        latestMessage: null,
      });
      await chat.populate("users", "username email avatar isOnline");
    }

    const chatData = {
      _id: chat._id.toString(),
      name: chat.name || null,
      isGroupChat: chat.isGroupChat,
      users: chat.users.map((user: any) => ({
        id: user._id.toString(),
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        isOnline: user.isOnline,
      })),
      receiver: chat.users.find((user: any) => user._id.toString() !== senderId.toString()),
      latestMessage: chat.latestMessage,
      messages: [],
    };
    return chatData;
  } catch (error : any) {
    throw new Error(`Failed to create or retrieve chat room: ${error.message}`);
  }
};
