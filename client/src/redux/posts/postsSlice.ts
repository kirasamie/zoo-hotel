import { createSlice } from '@reduxjs/toolkit';
import { fetchGetPostsByOrder } from './postsThunkActions';

export type PostType = {
  id: number;
  title: string;
  body: string;
  workerId: number;
  postPhotoLink: string;
  createdAt: string;
};

export type PostsType = PostType[];

export type PostsSliceState = {
  posts: PostsType;
};

const initialState: PostsSliceState = {
  posts: [],
};

const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchGetPostsByOrder.fulfilled, (state, action) => {
      state.posts = action.payload;
    });
  },
});

export default postsSlice.reducer;
