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
        removeIngredient: (state, action: PayloadAction<number>) => {
            const newItems = [...state.items]; 
            newItems.splice(action.payload, 1);
            state.items = newItems;
        },
        updateItemsOrder(state, action: PayloadAction<{ fromIndex: number; toIndex: number }>) {
            const { fromIndex, toIndex } = action.payload;
            const newItems = [...state.items];
            const [movedItem] = newItems.splice(fromIndex, 1);
            newItems.splice(toIndex, 0, movedItem);
            state.items = newItems;
        },
    },
});

export const { addIngredient, removeIngredient, updateItemsOrder } = ConstructorBurgerSlice.actions;
export default ConstructorBurgerSlice.reducer;