import { createAsyncThunk } from '@reduxjs/toolkit'
import requestWrapper from '../../utils/requestWrapper';

const urlOrders = "https://norma.nomoreparties.space/api/orders";

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
                },
                body: JSON.stringify({
                    ingredients: burgerIngredients
                })
            })
        );
    }
)