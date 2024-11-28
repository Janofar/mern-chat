// authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types';

interface AuthState {
  isAuthenticated: boolean;
  currentUser : User;
}

const initialState: AuthState = {
  isAuthenticated: false,
  currentUser : {
    _id : '',
    username : '',
    avatarUrl : '',
    isOnline:false,
    email : '',
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.isAuthenticated = true;
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
