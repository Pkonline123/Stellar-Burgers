import { createAsyncThunk } from '@reduxjs/toolkit'

const urlIngrident = "https://norma.nomoreparties.space/api/ingredients";

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async () => {
        try {
            const res = await fetch(urlIngrident);
            if (res.ok) {
                const data = await res.json();
                return data.data;
            } else {
                throw new Error(`Ошибка ${res.status}`);
            }
        } catch (error) {
            console.log(error);
            return error;
        }
    },
)