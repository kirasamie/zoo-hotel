import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosResponse } from 'axios';
import { UserType } from './userSlice';
import { InputsUserType } from '../components/AuthComponents/RegisterForm/RegisterForm';
import { PetType, PetsType } from './pet/petSlice';
import { InputsPetType } from '../components/AccountComponents/PetsComponent/PetForm';
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
    
export const fetchCheckAllPets = createAsyncThunk('/pets/all', async () => {
    const response = await axios.get<PetsType, AxiosResponse<PetsType>>(`${import.meta.env.VITE_URL}/pets/all`, {withCredentials: true});
    return response.data
})

export const fetchAddNewPet = createAsyncThunk(`pets/new`, async (inputs: InputsPetType) => {
    const response = await axios.post<PetType, AxiosResponse<PetType>>(`${import.meta.env.VITE_URL}/pets/new`, inputs, {withCredentials: true});
    return response.data
})
