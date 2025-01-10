import reducer, {
    setCurentIngrident,
    dropCurentIngrident,
    initialState
} from './reducer';
import { ingredient, bun } from '../../utils/test-constants';
import { fetchIngredients } from './thunk';

describe('IngredientsSlice', () => {

    it('should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should set current ingredient', () => {
        const state = reducer(initialState, setCurentIngrident(ingredient));
        expect(state.curentIngrident).toEqual(ingredient);
    });

    it('should drop current ingredient', () => {
        const stateWithIngredient = {
            ...initialState,
            curentIngrident: ingredient
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
                {
                    ingredient
                },
                {
                    bun
                }
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
