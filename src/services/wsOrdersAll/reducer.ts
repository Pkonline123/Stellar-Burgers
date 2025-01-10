import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WsOrderAllState {
    connected: boolean;
    orders: Orders[];
    total: number;
    totalToday: number;
    error: string | null;
}

export interface Orders {
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    number: number;
}

const initialState: WsOrderAllState = {
    connected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: null,
};

const wsOrderAllSlice = createSlice({
    name: 'wsOrderAll',
    initialState,
    reducers: {
        CONNECTED: (state) => {
            state.connected = true;
        },
        DISCONNECTED: (state) => {
            state.connected = false;
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
        },
        MESSAGE_RECEIVED: (state, action) => {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
        ERROR: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

export default wsOrderAllSlice.reducer;