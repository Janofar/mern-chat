
import Chat, { IChat } from '../models/Chat';
import Message from '../models/Message';
import mongoose, { Types } from 'mongoose';
import { ChatDTO } from '../types/chat';
import { Message as MessageType} from '../types/message';

export const createGroupChat = async (name: string,loggedinUserId : any, userIds: Types.ObjectId[],avatar : string) : Promise <ChatDTO>=> {
  try { 
     let chat = await Chat.create({
        isGroupChat: true,
        users: [...userIds,loggedinUserId],
        latestMessage: null,
        name,
        groupAdmins : [loggedinUserId],
        groupAvatar : avatar
      });
       
      await chat
      .populate({
        path: 'users',
        select: 'username email avatar groupAvatarUrl isOnline',
      });

    const chatData = {
      _id: chat._id.toString(),
      name: chat.name,
      groupAvatarUrl : chat?.groupAvatarUrl || null,
      isGroupChat: chat.isGroupChat,
      otherParticipants: chat.users.filter((user: any) => user._id.toString() !== loggedinUserId.toString()),
      groupAdmins : chat.groupAdmins,
      latestMessage: chat.latestMessage,
      messages: [],
    };
    return chatData;
  } catch (error : any) {
    throw new Error(`Failed to create or retrieve chat room: ${error.message || error}`);
  }
};

export const getAllChatsForUser = async (userId: mongoose.Types.ObjectId) : Promise <ChatDTO[]> => {
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
    groupAvatarUrl : chat?.groupAvatarUrl || null,
    otherParticipants: chat.isGroupChat ? chat.users.filter((user: any) => user._id.toString() !== userId.toString()) : null,
    receiver: !chat.isGroupChat ?
      chat.users.find((user: any) => user._id.toString() !== userId.toString()) : null,
    latestMessage: chat.latestMessage,
    messages: [],
  }));

  return chatsWithEmptyMessages;
};

export const getChatHistory = async (chatId: mongoose.Types.ObjectId, userId: mongoose.Types.ObjectId) : Promise<MessageType[]> => {
  try {
    const chat: any = await Chat.findById(chatId)
      .populate({
        path: 'users',
        select: 'username isOnline avatar avatartUrl',
      })
      .exec();

    const allMessages = await Message
      .find({ chat: chat._id })
      .sort({ createdAt: 1 })
      .populate({
        path: 'sender',
        select: 'username isOnline avatar avatarUrl',
      })
      .exec();

    const messages = allMessages.map((message: any) => ({
      _id: message._id.toString(),
      sender: {
        _id: message.sender._id.toString(),
        username: message.sender.username,
        avatarUrl: message.sender.avatarUrl,
        isOnline: message.sender.isOnline,
      },
      chatId : message.chatId,
      isGroupChat: chat.isGroupChat,
      timeStamp: message.createdAt.toString(),
      content: message.content,
      createdAt: message.createdAt.toISOString(),
    }));

    return messages;

  } catch (error) {
    throw new Error('Failed to retrieve chat history');
  }
};


export const createDirectChat = async (senderId: Types.ObjectId, receiverId: Types.ObjectId) : Promise<ChatDTO> => {
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
      groupAvatarUrl : chat?.groupAvatarUrl || null,
      receiver: chat.users.find((user: any) => user._id.toString() !== senderId.toString()),
      latestMessage: chat.latestMessage,
      messages: [],
    };
    return chatData;
  } catch (error : any) {
    throw new Error(`Failed to create or retrieve chat room: ${error.message}`);
  }
};
