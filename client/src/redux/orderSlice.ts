import { createSlice } from "@reduxjs/toolkit";
import { fetchCheckOrdersByRoom, fetchCheckOrdersByUser, fetchCheckOrdersByWorker } from "./thunkActions";
import { PetItemType } from "../models/Pet";

export type OrderType = {
    id: number;
    orderPetId: number;
    orderRoomId: number;
    orderDateIn: string;
    orderDateOut: string;
    addInfo?: string;
    paymentStatus: boolean;
    addServices: string;
    Pet: PetItemType
}

export type OrdersType = OrderType[];

export type OrderSliceState = {
    ordersUser: OrdersType;
    ordersRoom: OrdersType;
    ordersWorker: OrdersType;
}

const initialState: OrderSliceState = {
    ordersUser: [],
    ordersRoom: [],
    ordersWorker: [],
}

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCheckOrdersByUser.fulfilled, (state, { payload }) => {
            state.ordersUser = payload;
        })
        builder.addCase(fetchCheckOrdersByWorker.fulfilled, (state, { payload }) => {
            state.ordersWorker = payload;
        })
        builder.addCase(fetchCheckOrdersByRoom.fulfilled, (state, {payload}) => {
            state.ordersRoom = payload;
        })
    }
})

export default orderSlice.reducer;
