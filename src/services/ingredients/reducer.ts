import { createSlice } from '@reduxjs/toolkit'
import DataItem from '../../utils/dataType';
import { fetchIngredients } from './thunk';

export interface IngredientsState {
    items: DataItem[];
    loadding: boolean;
    err: string;
    curentIngrident: DataItem | null
}

export const initialState: IngredientsState = {
    items: [],
    loadding: true,
    err: "",
    curentIngrident: null
}

export const IngredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {
        setCurentIngrident: (state, action) => {
            state.curentIngrident = action.payload
        },
        dropCurentIngrident: (state) => {
            state.curentIngrident = null
        }
        // sucssesGetIngredients: (state, action: PayloadAction<DataItem[]>) => {
        //     state.items = action.payload;
        //     state.loadding = false;
        //     state.err = "";
        // },
        // errorGetIngredients: (state, action: PayloadAction<string>) => {
        //     state.loadding = false;
        //     state.err = action.payload;
        // },
        // loaddingGetIngredients: (state) => {
        //     state.loadding = true;
        //     state.err = "";
        // },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchIngredients.pending, (state, action) => {
                state.loadding = true;
                state.err = "";
            })
            .addCase(fetchIngredients.fulfilled, (state, action) => {
                state.items = action.payload.data;
                state.loadding = false;
                state.err = "";
            })
            .addCase(fetchIngredients.rejected, (state, action) => {
                state.loadding = false;
                state.err = "";
            })
    }
})


export const { setCurentIngrident, dropCurentIngrident } = IngredientsSlice.actions
export default IngredientsSlice.reducer