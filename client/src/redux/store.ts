import { ConfigureStoreOptions, configureStore } from '@reduxjs/toolkit';
import petSlice, { PetSliceState } from './pet/petSlice';
import userSlice, { SliceState } from './userSlice';
import orderSlice, { OrderSliceState } from './orderSlice';
import postsSlice, { PostsSliceState } from './posts/postsSlice';

export type StoreType = {
  petSlice: PetSliceState;
  userSlice: SliceState;
  orderSlice: OrderSliceState;
  postsSlice: PostsSliceState;
};

const storeOptions: ConfigureStoreOptions<StoreType> = {
  reducer: {
    petSlice,
    userSlice,
    orderSlice,
    postsSlice,
  },
};

export const store = configureStore(storeOptions);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
