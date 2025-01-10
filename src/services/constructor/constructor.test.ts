import constructorReducer, {
    addIngredient,
    removeIngredient,
    updateItemsOrder,
    restoreConstructor,
    dropAllIngridents,
    ConstructorBurgerState
} from './reducer';

const initialState: ConstructorBurgerState = {
    items: [],
    bun: null
};

describe('ConstructorBurgerSlice', () => {
    it('should handle initial state', () => {
        expect(constructorReducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should add ingredient to items or set bun', () => {
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
        const action = addIngredient(ingredient);
        const state = constructorReducer(initialState, action);
        expect(state.items).toHaveLength(1);
        expect(state.items[0]).toEqual(ingredient);

        const bun = {
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
        };
        const actionBun = addIngredient(bun);
        const stateWithBun = constructorReducer(state, actionBun);
        expect(stateWithBun.bun).toEqual(bun);
    });

    it('should remove ingredient from items', () => {
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
        const stateWithIngredient = constructorReducer(initialState, addIngredient(ingredient));
        const action = removeIngredient('1');
        const stateAfterRemove = constructorReducer(stateWithIngredient, action);
        expect(stateAfterRemove.items).toHaveLength(0);
    });

    it('should update the order of items', () => {
        const ingredient1 = {
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
        const ingredient2 = {
            id: '2',
            _id: "2",
            name: "Соус Spicy-X",
            type: "sauce",
            proteins: 30,
            fat: 20,
            carbohydrates: 40,
            calories: 30,
            price: 903,
            image: "https://code.s3.yandex.net/react/code/sauce-02.png",
            image_mobile: "https://code.s3.yandex.net/react/code/sauce-02-mobile.png",
            image_large: "https://code.s3.yandex.net/react/code/sauce-02-large.png",
            __v: 0
        };
        const stateWithItems = constructorReducer(initialState, addIngredient(ingredient1));
        const stateWithTwoItems = constructorReducer(stateWithItems, addIngredient(ingredient2));

        const action = updateItemsOrder({ fromIndex: 0, toIndex: 1 });
        const stateAfterUpdate = constructorReducer(stateWithTwoItems, action);
        expect(stateAfterUpdate.items[0]).toEqual(ingredient2);
        expect(stateAfterUpdate.items[1]).toEqual(ingredient1);
    });

    it('should restore constructor state', () => {
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
        const bun = {
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
        };
        const restoredState = {
            items: [ingredient],
            bun
        };
        const action = restoreConstructor(restoredState);
        const stateAfterRestore = constructorReducer(initialState, action);
        expect(stateAfterRestore.items).toEqual([ingredient]);
        expect(stateAfterRestore.bun).toEqual(bun);
    });

    it('should drop all ingredients', () => {
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
        const bun = {
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
        };
        const stateWithItems = constructorReducer(initialState, addIngredient(ingredient));
        const stateWithBun = constructorReducer(stateWithItems, addIngredient(bun));
        const action = dropAllIngridents();
        const stateAfterDrop = constructorReducer(stateWithBun, action);
        expect(stateAfterDrop.items).toHaveLength(0);
        expect(stateAfterDrop.bun).toBeNull();
    });
});
