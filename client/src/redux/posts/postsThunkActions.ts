import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGetPostsByOrder = createAsyncThunk('posts', async (orderId: number) => {
  const response = await axios.get(`${import.meta.env.VITE_URL}/posts/${orderId}`, { withCredentials: true });
  return response.data;
});
