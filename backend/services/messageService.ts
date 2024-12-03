import Message from '../models/Message';
import Chat, { IChat } from '../models/Chat';
import { Types } from 'mongoose';
import { User } from '../types/user';
import { ChatData, ChatDTO } from '../types/chat';
import { Message as MessageType} from '../types/message';

export const saveMessage = async (senderId: Types.ObjectId, chatId: Types.ObjectId, content: string) : Promise<MessageType>=> {
  let message = await Message.create({ sender: senderId, chat: chatId, content });

  message = await message.populate([
    { path: 'chat' },
    { path: 'sender', select: 'username avatar avatarUrl isOnline' },
  ])
    await Chat.findByIdAndUpdate(chatId, { latestMessage: message._id });
    const chat : ChatData = message.chat;
    const sender : User = message.sender;

    let receiver: User | null = null;
    let otherParticipants: User[] = [];

    if (!chat.isGroupChat) {
      receiver = chat.users.find(
        (user: User) => user._id.toString() !== senderId.toString()
      ) || null;
    } else {
      otherParticipants = chat.users.filter(
        (user: User) => user._id.toString() !== senderId.toString()
      );
    }

    return {
      _id: message._id.toString(),
      chatId : chat._id,
      sender: {
        _id: sender._id.toString(),
        username: sender.username,
        avatarUrl: sender.avatarUrl,
        isOnline: sender.isOnline,
      },
      isGroupChat: chat.isGroupChat,
      timeStamp: message.createdAt.toISOString(),
      content: message.content,
    };
};

export const getChatMessages = async (chatId: Types.ObjectId) => {
    return await Message.find({ chat: chatId })
    .populate('sender', 'username avatar')
    .populate('chat', 'name isGroupChat');
};

  
  