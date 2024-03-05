import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getPets } from "./async-action";
import { PetResponseType } from "../../models/Pet";
import { StoreType } from "../store"
import { fetchAddNewPet, fetchCheckAllPets } from "../thunkActions";


export type PetType = {
  id: number;
  petName: string;
  petBreed?: string;
  petGender: string;
  petAge: number;
  petIsPrayed: boolean;
  petAbout?: string;
}

export type PetsType = PetType[];

export type PetSliceState = {
  pets: PetsType;
}

const initialState: PetSliceState = {
  pets: [],
}

const petSlice = createSlice({
  name: 'petSlice', 
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCheckAllPets.fulfilled, (state, {payload}) => {
        state.pets = payload
      })
      builder.addCase(fetchAddNewPet.fulfilled, (state, {payload}) => {
        state.pets.push(payload);
      })
  }
  })
  export default petSlice.reducer;
  
  export const selectPets = (state: StoreType) => state.petSlice.pets