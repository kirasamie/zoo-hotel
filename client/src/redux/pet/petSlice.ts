import { createSlice } from "@reduxjs/toolkit";
import { PetResponseType } from "../../models/Pet";
import { StoreType } from "../store"
import { fetchAddNewPet, fetchCheckAllPets, fetchDelPet, fetchEditPet } from "./async-action";

export type PetSliceState = {
  pets: PetResponseType;
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
      builder.addCase(fetchEditPet.fulfilled, (state, { payload }) => {
        console.log(payload);
        
       state.pets = state.pets.map((el) => {
        if (el.id === payload.id) {
          return payload
        }
          return el
        
       })
      });
      builder.addCase(fetchDelPet.fulfilled, (state, { payload }) => {
        state.pets = state.pets.filter((el) => el.id !== payload);
      });
  }
  })
  export default petSlice.reducer;
  
  export const selectPets = (state: StoreType) => state.petSlice.pets