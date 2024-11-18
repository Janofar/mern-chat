import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './reducers/chatSlice';
import userReducer from './reducers/userSlice';
import messageReducer from './reducers/messageSlice';
import authReducer from './reducers/authSlice';

export const store = configureStore({
  reducer: {
    chat: chatReducer,
    user : userReducer,
    message : messageReducer,
    auth : authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;