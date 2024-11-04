import { createAsyncThunk } from '@reduxjs/toolkit'

const urlOrders = "https://norma.nomoreparties.space/api/orders";

export const fetchOrders = createAsyncThunk(
    'orders/fetchOrderInfo',
    async (burgerIngredients: string[]) => {
        try {
            const res = await fetch(urlOrders, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ingredients: burgerIngredients
                })
            });
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                throw new Error(`Ошибка ${res.status}`);
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    },
)