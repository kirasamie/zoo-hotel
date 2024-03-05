import { ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';
import todoSlice, { SliceStateType } from './todoSlice';
import { petSliceType } from './pet/types';
import petSlice from './pet/petSlice';

export type StoreType = {
  todoSlice: SliceStateType; //!
  petSlice:  petSliceType
};

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    todoSlice,
    petSlice
     //!
  },
};

export const store = configureStore(storeOptions)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
