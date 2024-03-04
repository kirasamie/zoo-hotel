import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
// import type { TodoInputType, TodoType } from '../types'; //!

export const fetchTodos = createAsyncThunk('todos/all', async () => {
  const response = await axios.get<TodoType[]>(`${import.meta.env.VITE_URL}/todos`);
  if (typeof response.data === 'string') return JSON.parse(response.data)
  return response.data;
});

export const fetchAddTodo = createAsyncThunk('todos/add', async (input: TodoInputType) => {
  const response = await axios.post<TodoInputType, AxiosResponse<TodoType>>(`${import.meta.env.VITE_URL}/todos`, input);
  return response.data;
});

export const fetchDelTodo = createAsyncThunk('todos/del', async (id: number) => {
  await axios.delete(`${import.meta.env.VITE_URL}/todos/${id}`);
  return id;
});

export const fetchPatchTodo = createAsyncThunk('todos/patch', async ({ id, input }: { id: number, input: { title?: string, status?: boolean } }) => {
  const response = await axios.patch(`${import.meta.env.VITE_URL}/todos/${id}`, input);
  return response.data
});
