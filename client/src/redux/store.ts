import { ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';
import todoSlice, { SliceStateType } from './todoSlice';

type StoreType = {
  todoSlice: SliceStateType; //!
};

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    todoSlice, //!
  },
};

export const store = configureStore(storeOptions)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
