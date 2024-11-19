import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import DataItem from '../../utils/dataType';

export interface ConstructorBurgerState {
    items: DataItem[];
    bun: DataItem | null;
}

const initialState: ConstructorBurgerState = {
    items: [],
    bun: null
};

const ConstructorBurgerSlice = createSlice({
    name: 'constructor',
    initialState,
    reducers: {
        addIngredient: (state, action: PayloadAction<DataItem>) => {
            const ingredient = action.payload;
            if (ingredient.type === 'bun') {
                state.bun = ingredient;
            } else {
                state.items.push(ingredient);
            }
        },
        removeIngredient: (state, action: PayloadAction<string>) => {
            // const newItems = [...state.items]; 
            // newItems.splice(action.payload, 1);
            // state.items = newItems;
            state.items = state.items.filter(item => item.id !== action.payload);
        },
        updateItemsOrder(state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) {
            const { fromIndex, toIndex } = action.payload;
            const newItems = [...state.items];
            const [movedItem] = newItems.splice(fromIndex, 1);
            newItems.splice(toIndex, 0, movedItem);
            state.items = newItems;
        },
        restoreConstructor: (state, action: PayloadAction<ConstructorBurgerState>) => {
            state.items = action.payload.items;
            state.bun = action.payload.bun;
        },
        dropAllIngridents: (state) => {
            state.items = [];
            state.bun = null;
        }
    },
});

export const { addIngredient, removeIngredient, updateItemsOrder, restoreConstructor, dropAllIngridents } = ConstructorBurgerSlice.actions;
export default ConstructorBurgerSlice.reducer;