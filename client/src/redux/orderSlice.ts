import { createSlice } from "@reduxjs/toolkit";
import { fetchCheckOrdersByRoom, fetchCheckOrdersByUser } from "./thunkActions";

export type OrderType = {
    id: number;
    orderPetId: number;
    orderRoomId: number;
    orderDateIn: string;
    orderDateOut: string;
    addInfo?: string;
    paymentStatus: boolean;
}

export type OrdersType = OrderType[];

export type OrderSliceState = {
    ordersUser: OrdersType;
    ordersRoom: OrdersType;
}

const initialState: OrderSliceState = {
    ordersUser: [],
    ordersRoom: [],
}

const orderSlice = createSlice({
    name: 'orderSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchCheckOrdersByUser.fulfilled, (state, { payload }) => {
            state.ordersUser = payload;
        })
        builder.addCase(fetchCheckOrdersByRoom.fulfilled, (state, {payload}) => {
            state.ordersRoom = payload;
        })
    }
})

export default orderSlice.reducer;
