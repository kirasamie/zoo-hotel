import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { UserType } from './userSlice';
import { InputsUserType } from '../components/AuthComponents/RegisterForm/RegisterForm';
// import type { TodoInputType, TodoType } from '../types'; //!

export const fetchCheckUser = createAsyncThunk('/', async () => {
  const response = await axios.get<UserType, AxiosResponse<UserType>>(`${import.meta.env.VITE_URL}/user/checkSession`, {withCredentials: true});
  return response.data;
});

export const fetchRegisterUser = createAsyncThunk(`/register`, async (inputs: InputsUserType) => {
    const response = await axios.post<UserType, AxiosResponse<UserType>>(`${import.meta.env.VITE_URL}/user/register`, inputs, {withCredentials: true});
    return response.data;
})

export const fetchLoginUser = createAsyncThunk(`/login`, async (inputs: InputsUserType) => {
    const response = await axios.post<UserType, AxiosResponse<UserType>>(`${import.meta.env.VITE_URL}/user/login`, inputs, {withCredentials: true})
    return response.data;
})

export const fetchLogoutUser = createAsyncThunk(`/logout`, async () => {
    const response = await axios.get<UserType, AxiosResponse<UserType>>(`${import.meta.env.VITE_URL}/user/logout`,{withCredentials: true});
    if (response.status === 200) {
        return {msg: 'Goodbye!'};
    }
})
