import { ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';
import userSlice from './userSlice';
import type { SliceState } from './userSlice';

type StoreType = {
  userSlice: SliceState;
}

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    userSlice,
  },
};

export const store = configureStore(storeOptions)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
