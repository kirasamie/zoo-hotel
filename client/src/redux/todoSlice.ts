import { createSlice } from '@reduxjs/toolkit';
import { TodoType } from '../types';
import { fetchAddTodo, fetchDelTodo, fetchPatchTodo, fetchTodos } from './thunkActions';

export type SliceStateType = {
  isLoading: boolean;
  todos: TodoType[];
};

const initialState: SliceStateType = {
  isLoading: true,
  todos: [],
};

const todoSlice = createSlice({ //!
  name: 'todoSlice',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTodos.fulfilled, (state, action) => {
      state.todos = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAddTodo.fulfilled, (state, action) => {
      state.todos.unshift(action.payload);
    });
    builder.addCase(fetchDelTodo.fulfilled, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    });
    builder.addCase(fetchPatchTodo.fulfilled, (state, action) => {
      state.todos = state.todos.map((todo) => (todo.id === action.payload.id ? action.payload : todo));
    });
  },
});

export default todoSlice.reducer;
