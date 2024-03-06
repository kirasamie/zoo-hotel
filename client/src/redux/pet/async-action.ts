import { createAsyncThunk } from "@reduxjs/toolkit"
import axios, { AxiosResponse } from "axios"
import { API } from "../../constants/api"
import { PetItemType, PetResponseType } from "../../models/Pet"
import { InputsPetType } from "../../components/AccountComponents/PetsComponent/PetForm"


export const fetchCheckAllPets = createAsyncThunk('/pets/all', async () => {
  const response = await axios.get<PetResponseType, AxiosResponse<PetResponseType>>(API+'/pets/all', {withCredentials: true});
  return response.data
})

export const fetchAddNewPet = createAsyncThunk(`pets/new`, async (inputs: InputsPetType) => {
  const response = await axios.post<PetResponseType, AxiosResponse<PetItemType>>(API+'/pets/new', inputs, {withCredentials: true});
  return response.data
})

export const fetchEditPet = createAsyncThunk(`pets/edit`, async ({id, inputs}: {id: number, inputs:InputsPetType }) => {
  const response = await axios.patch(`${API}/pets/edit/${id}`, inputs,  {withCredentials: true});
  console.log(response);
  
  return response.data
})

export const fetchDelPet = createAsyncThunk(`pets/del`, async (id: number) => {
  const response = await axios.delete(`${API}/pets/${id}`,  {withCredentials: true});
  if (response.status === 200) {
    return id;
  }
})