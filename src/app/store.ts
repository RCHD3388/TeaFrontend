
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import localStorage from 'redux-persist/lib/storage';
import userSlice from "./reducers/userSlice";

const persistConfig = {
  key: 'user',
  storage: localStorage
};

const persistedUserSlice = persistReducer(persistConfig, userSlice);

export const store = configureStore({
  reducer: {
    user: persistedUserSlice
  }
});

export type AppDispatch = typeof store.dispatch;
export const persistor = persistStore(store);
