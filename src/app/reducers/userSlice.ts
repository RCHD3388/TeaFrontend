// src/reducers/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
  username: string | null;
  role: string | null;
  access_token: string | null;
}

const initialState: UserState = {
  username: null,
  role: null,
  access_token: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username: string; role: string; access_token: string }>) => {
      const { username, role, access_token } = action.payload;
      state.username = username;
      state.role = role;
      state.access_token = access_token;
    },

    logoutUser: (state) => {
      state.username = null;
      state.role = null;
      state.access_token = null;
    },
  },
});

export const selectUser = (state: RootState) => state.user;
export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
