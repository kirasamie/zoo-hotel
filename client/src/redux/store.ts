import { ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';

// import todoSlice, { SliceStateType } from './todoSlice';
import petSlice, { PetSliceState } from './pet/petSlice';
import userSlice from './userSlice';
import type { SliceState } from './userSlice';

export type StoreType = {
  // todoSlice: SliceStateType; //!
  petSlice:  PetSliceState;
  userSlice: SliceState;
};


const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    petSlice,
    userSlice,
  },
};

export const store = configureStore(storeOptions)

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
