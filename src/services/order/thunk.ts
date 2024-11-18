import { createAsyncThunk } from '@reduxjs/toolkit'
import requestWrapper from '../../utils/requestWrapper';
import { BASE_URL } from '../../utils/consts';

const urlOrders = BASE_URL + "/orders";

interface OrderResponse {
    name: string;
    order: {
        number: number;
    };
    success: boolean;
}

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrderInfo',
    async (burgerIngredients: string[]) => {
        return await requestWrapper<OrderResponse>(() =>
            fetch(urlOrders, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    authorization: localStorage.getItem("accessToken") || ''
                },
                body: JSON.stringify({
                    ingredients: burgerIngredients
                })
            })
        );
    }
)