import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ChatDataForUI, ChatState, MessageState } from '../types';

const initialState: ChatState = {
  chats: [],
  selectedChat: {
    _id: '',
    name: '',
    isGroupChat: false,
    users: [],
    messages: [],
  },

};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setChatsForUser: (state, action: PayloadAction<ChatDataForUI[]>) => {
      state.chats = action.payload;
    },
    setSelectedChat: (state, action: PayloadAction<ChatDataForUI>) => {
      state.selectedChat = action.payload;
    },
    updateChatMessages: (state, action: PayloadAction<MessageState[]>) => {
      if (state.selectedChat) {
        state.selectedChat.messages = action.payload
      }
    },
    addChat: (state, action: PayloadAction<ChatDataForUI>) => {
      state.chats.push(action.payload);
    },
    addChatMessage: (state, action: PayloadAction<MessageState>) => {
      if (state.selectedChat) {
        state.selectedChat.messages.push(action.payload)
      }
    },
    updateLatestChatMessage: (state, action: PayloadAction<MessageState>) => {
      state.chats.forEach((chat) => {
        if (chat._id == action.payload.chatId) {
          chat.latestMessage = action.payload;
        }
      })
    }
  },
});

export const { setSelectedChat, setChatsForUser, updateChatMessages,addChatMessage,addChat, updateLatestChatMessage } = chatSlice.actions;
export default chatSlice.reducer;