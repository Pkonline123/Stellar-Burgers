import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders } from './thunc';

export interface OrderState {
    name: string;
    order: null | {
        number: number;
    };
    success: boolean;
}

const initialState: OrderState = {
    name: "",
    order: null,
    success: false,
};

const OrderStateSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchOrders.pending, (state) => {
                state.name = "";
                state.order = null;
                state.success = false;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.name = action.payload.name;
                state.order = action.payload.order;
                state.success = true;
            })
            .addCase(fetchOrders.rejected, (state) => {
                state.name = "";
                state.order = null;
                state.success = false;;
            })
    }
});

export default OrderStateSlice.reducer;