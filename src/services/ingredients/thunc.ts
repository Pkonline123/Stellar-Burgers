import { createAsyncThunk } from '@reduxjs/toolkit'
import requestWrapper from '../../utils/requestWrapper';
import DataItem from '../../utils/dataType';

const urlIngrident = "https://norma.nomoreparties.space/api/ingredients";

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async () => {
        return await requestWrapper<{ data: DataItem[] }>(() => fetch(urlIngrident));
    },
)