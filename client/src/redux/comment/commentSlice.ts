import { createSlice } from "@reduxjs/toolkit";
import { initialState } from "./types";
import { fetchAddNewComment, fetchCheckAllComments } from "./async-action";
import { StoreType } from "../store";

const commentSlice = createSlice({
    name: 'commentSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCheckAllComments.fulfilled, (state, { payload }) => {
            state.comments = payload
        })
        builder.addCase(fetchAddNewComment.fulfilled, (state, { payload}) => {
            state.comments.push(payload);
        })
    }
})

export default commentSlice.reducer;
  
export const selectPets = (state: StoreType) => state.commentSlice.comments