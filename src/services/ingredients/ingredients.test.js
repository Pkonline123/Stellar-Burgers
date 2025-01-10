import reducer, {
    setCurentIngrident,
    dropCurentIngrident
} from './reducer';
import { fetchIngredients } from './thunk';

describe('IngredientsSlice', () => {
    const initialState = {
        items: [],
        loadding: true,
        err: "",
        curentIngrident: null
    };

    it('should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should set current ingredient', () => {
        const ingredient = { id: '1', name: 'Cheese', type: 'ingredient', price: 50 };
        const state = reducer(initialState, setCurentIngrident(ingredient));
        expect(state.curentIngrident).toEqual(ingredient);
    });

    it('should drop current ingredient', () => {
        const stateWithIngredient = {
            ...initialState,
            curentIngrident: { id: '1', name: 'Cheese', type: 'ingredient', price: 50 }
        };
        const state = reducer(stateWithIngredient, dropCurentIngrident());
        expect(state.curentIngrident).toBeNull();
    });

    describe('extraReducers', () => {
        it('should handle fetchIngredients.pending', () => {
            const action = { type: fetchIngredients.pending.type };
            const state = reducer(initialState, action);
            expect(state.loadding).toBe(true);
            expect(state.err).toBe("");
        });

        it('should handle fetchIngredients.fulfilled', () => {
            const mockData = [
                { id: '1', name: 'Cheese', type: 'ingredient', price: 50 },
                { id: '2', name: 'Bun', type: 'bun', price: 100 }
            ];
            const action = {
                type: fetchIngredients.fulfilled.type,
                payload: { data: mockData }
            };
            const state = reducer(initialState, action);
            expect(state.loadding).toBe(false);
            expect(state.err).toBe("");
            expect(state.items).toEqual(mockData);
        });

        it('should handle fetchIngredients.rejected', () => {
            const action = { type: fetchIngredients.rejected.type };
            const state = reducer(initialState, action);
            expect(state.loadding).toBe(false);
            expect(state.err).toBe("");
        });
    });
});
