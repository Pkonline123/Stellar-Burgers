import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WebSocketState {
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

const initialState: WebSocketState = {
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
        connected(state) {
            state.connected = true;
        },
        disconnected(state) {
            state.connected = false;
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
        },
        messageReceived(state, action) {
            state.orders = action.payload.orders;
            state.total = action.payload.total;
            state.totalToday = action.payload.totalToday;
        },
        errorReceived(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export const {
    connected,
    disconnected,
    messageReceived,
    errorReceived,
} = wsOrderAllSlice.actions;

export default wsOrderAllSlice.reducer;