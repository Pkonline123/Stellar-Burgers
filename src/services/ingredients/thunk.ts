import { createAsyncThunk } from '@reduxjs/toolkit'
import requestWrapper from '../../utils/requestWrapper';
import DataItem from '../../utils/dataType';
import { BASE_URL } from '../../utils/consts';

const urlIngrident = BASE_URL + "/ingredients";

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async () => {
        return await requestWrapper<{ data: DataItem[] }>(() => fetch(urlIngrident));
    },
)