import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { getPets } from "./async-action";
import { PetResponseType } from "../../models/Pet";
import { petSliceType } from "./types";
import { StoreType } from "../store"

const initialState: petSliceType = {
  items: []
}

const petSlice = createSlice({
  name: 'petSlice', 
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(getPets.fulfilled, (state, action: PayloadAction<PetResponseType>)=> {
        state.items = action.payload
      })
     
  }
  })
  export default petSlice.reducer;
  
  export const selectPets = (state: StoreType) => state.petSlice.items