import { createSlice } from '@reduxjs/toolkit';
import { fetchOrders } from './thunk';

export interface OrderState {
    name: string;
    order: null | {
        number: number;
    };
    success: boolean;
    isLoading: boolean;
}

export const initialState: OrderState = {
    name: "",
    order: null,
    success: false,
    isLoading: false,
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
                state.isLoading = true;
            })
            .addCase(fetchOrders.fulfilled, (state, action) => {
                state.name = action.payload.name;
                state.order = action.payload.order;
                state.success = true;
                state.isLoading = false;
            })
            .addCase(fetchOrders.rejected, (state) => {
                state.name = "";
                state.order = null;
                state.success = false;
                state.isLoading = false;
            })
    }
});

export default OrderStateSlice.reducer;