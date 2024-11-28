
import Chat, { IChat } from '../models/Chat';
import Message from '../models/Message';
import mongoose, { Types } from 'mongoose';
import { UserDTO } from '../types/user';

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
      otherParticipants: chat.users.find((user: any) => user._id.toString() !== loggedinUserId.toString()),
      groupAdmins : chat.groupAdmins,
      latestMessage: chat.latestMessage,
      messages: [],
    };
    return chatData;
  } catch (error : any) {
    throw new Error(`Failed to create or retrieve chat room: ${error.message || error}`);
  }
};

export const getAllChatsForUser = async (userId: mongoose.Types.ObjectId) => {
  const chats = await Chat.find({ users: userId })
    .populate({
      path: 'users',
      select: 'username isOnline avatar email',
    })
    .populate({
      path: 'latestMessage',
      select: 'content sender',
      populate: {
        path: 'sender',
        select: 'username avatar avatarUrl',
      },
    })
    .exec();
  const chatsWithEmptyMessages = chats.map(chat => ({
    _id: chat._id.toString(),
    name: chat.name,
    isGroupChat: chat.isGroupChat,
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
        select: 'username isOnline avatar avatartUrl',
      })
      .exec();

    let receiver: any;
    if (!chat.isGroupChat) {
      receiver = chat.users.find((user: UserDTO) => user._id.toString() !== userId.toString());
    }

    const messages = await Message
      .find({ chat: chat._id })
      .sort({ createdAt: 1 })
      .populate({
        path: 'sender',
        select: 'username isOnline avatar avatarUrl',
      })
      .exec();

    const mappedMessages = messages.map((message: any) => ({
      _id: message._id.toString(),
      sender: {
        id: message.sender._id.toString(),
        username: message.sender.username,
        avatarUrl: message.sender.avatarUrl,
        isOnline: message.sender.isOnline,
      },
      receiver: {
        id: receiver._id.toString(),
        username: receiver.username,
        avatarUrl: receiver.avatarUrl,
        isOnline: receiver.isOnline,
      },
      isGroupChat: chat.isGroupChat,
      timeStamp: message.createdAt.toString(),
      content: message.content,
      createdAt: message.createdAt.toISOString(),
    }));

    return {
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
    }).populate("users", "username email avatar isOnline").exec();

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
      isGroupChat: chat.isGroupChat,
      receiver: chat.users.find((user: any) => user._id.toString() !== senderId.toString()),
      latestMessage: chat.latestMessage,
      messages: [],
    };
    return chatData;
  } catch (error : any) {
    throw new Error(`Failed to create or retrieve chat room: ${error.message}`);
  }
};
