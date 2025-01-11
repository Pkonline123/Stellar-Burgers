import { createSlice } from '@reduxjs/toolkit';
import { getCurrentOrder } from './thunk';

interface CurrentOrderState {
    status: string;
    orders: CurrentOrder | null;
    error: string;
}

export interface CurrentOrder {
    _id: string;
    ingredients: string[];
    owner: string;
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
}

export const initialState: CurrentOrderState = {
    status: '',
    orders: null,
    error: '',
};

const CurrentOrderSlice = createSlice({
    name: 'currentOrder',
    initialState,
    reducers: {
        dropCurentOrder: (state) => {
            state.status = '';
            state.orders = null;
            state.error = '';
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getCurrentOrder.pending, (state) => {
                state.status = "loading";
                state.error = "";
            })
            .addCase(getCurrentOrder.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.orders = action.payload.orders[0];
            })
            .addCase(getCurrentOrder.rejected, (state, action) => {
                state.status = "error";
                state.error = action.error.message || "Ошибка загрузки заказа";
            });
    }
});


export const { dropCurentOrder } = CurrentOrderSlice.actions
export default CurrentOrderSlice.reducer;
