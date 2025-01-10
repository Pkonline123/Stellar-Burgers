import reducer, {
    setCurentIngrident,
    dropCurentIngrident,
    IngredientsState
} from './reducer';
import { fetchIngredients } from './thunk';

describe('IngredientsSlice', () => {
    const initialState: IngredientsState = {
        items: [],
        loadding: true,
        err: "",
        curentIngrident: null
    };

    it('should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should set current ingredient', () => {
        const ingredient = {
            id: '1',
            _id: "1",
            name: "Соус Spicy-X",
            type: "sauce",
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 90,
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            __v: 0
        };
        const state = reducer(initialState, setCurentIngrident(ingredient));
        expect(state.curentIngrident).toEqual(ingredient);
    });

    it('should drop current ingredient', () => {
        const stateWithIngredient = {
            ...initialState,
            curentIngrident: {
                id: '1',
                _id: "1",
                name: "Соус Spicy-X",
                type: "sauce",
                proteins: 30,
                fat: 20,
                carbohydrates: 40,
                calories: 30,
                price: 90,
                image: "https://code.s3.yandex.net/react/code/sauce-02.png",
                image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
                __v: 0
            }
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
                    id: '1',
                    _id: "1",
                    name: "Соус Spicy-X",
                    type: "sauce",
                    proteins: 30,
                    fat: 20,
                    carbohydrates: 40,
                    calories: 30,
                    price: 90,
                    image: "https://code.s3.yandex.net/react/code/sauce-02.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
                    image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
                    __v: 0
                },
                {
                    id: '2',
                    _id: "2",
                    name: "Краторная булка N-200i",
                    type: "bun",
                    proteins: 80,
                    fat: 24,
                    carbohydrates: 53,
                    calories: 420,
                    price: 1255,
                    image: "https://code.s3.yandex.net/react/code/bun-02.png",
                    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
                    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
                    __v: 0
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
