import { createSlice } from "@reduxjs/toolkit";
import { fetchCheckUser, fetchRegisterUser, fetchLoginUser, fetchLogoutUser, fetchEditUser } from "./thunkActions";

export type UserType = {
    id: number;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    avatar?: string;
    phone?: string;
    isWorker?: boolean | null;
  };

export type SliceState = {
    info: UserType
}


const initialStateUser: UserType = {
    id: 0,
    firstName: '', 
    lastName: '',
    email: '', 
    password: '', 
    avatar: '', 
    phone: '',
    isWorker: null,
}

const initialState: SliceState = {
    info: initialStateUser,
}

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCheckUser.fulfilled, (state, { payload }) => {
            state.info = payload;
        });

        builder.addCase(fetchRegisterUser.fulfilled, (state, {payload}) => {
            state.info = payload
        });
        builder.addCase(fetchLoginUser.fulfilled, (state, {payload}) => {
            state.info = payload
        });

        builder.addCase(fetchLogoutUser.fulfilled, (state) => {
            state.info = initialStateUser;
        })
        builder.addCase(fetchEditUser.fulfilled, (state, { payload }) => {
            state.info = payload
          });
    }
})

export default userSlice.reducer;