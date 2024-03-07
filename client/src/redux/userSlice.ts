import { createSlice } from "@reduxjs/toolkit";
import { fetchCheckUser, fetchRegisterUser, fetchLoginUser, fetchLogoutUser } from "./thunkActions";

export type UserType = {
    id: number;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    avatar?: string;
    phone?: number;
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
    phone: 0,
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
    }
})

export default userSlice.reducer;