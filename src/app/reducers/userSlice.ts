// src/reducers/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface UserState {
  _id: string | null;
  username: string | null;
  role: string | null;
  name: string | null;
  access_token: string | null;
  loggedIn: boolean;
}

const initialState: UserState = {
  _id: null,
  username: null,
  role: null,
  name: null,
  access_token: null,
  loggedIn: false
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ username: string; role: string; access_token: string, name: string, _id: string }>) => {
      const { username, role, name, access_token, _id } = action.payload;
      state._id = _id;
      state.username = username;
      state.role = role;
      state.name = name
      state.access_token = access_token;
      state.loggedIn = true
    },

    logoutUser: (state) => {
      return initialState
    },
  },
});

export const selectUser = (state: RootState) => state.user;
export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
