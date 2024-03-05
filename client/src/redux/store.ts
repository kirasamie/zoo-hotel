import { ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';

import todoSlice, { SliceStateType } from './todoSlice';
import { petSliceType } from './pet/types';
import petSlice from './pet/petSlice';
import userSlice from './userSlice';
import type { SliceState } from './userSlice';

export type StoreType = {
  todoSlice: SliceStateType; //!
  petSlice:  petSliceType;
  userSlice: SliceState;
};


const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
  },
};

export const store = configureStore(storeOptions)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
