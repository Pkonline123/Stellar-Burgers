import constructorReducer, {
    addIngredient,
    removeIngredient,
    updateItemsOrder,
    restoreConstructor,
    dropAllIngridents,
    initialState
} from './reducer';

import { ingredient, bun } from '../../utils/test-constants';

describe('ConstructorBurgerSlice', () => {

    it('should handle initial state', () => {
        expect(constructorReducer(undefined, { type: 'unknown' })).toEqual({ items: [], bun: null });
    });
      

    it('should add ingredient to items or set bun', () => {
        const action = addIngredient(ingredient);
        const state = constructorReducer(initialState, action);
        expect(state.items).toHaveLength(1);
        expect(state.items[0]).toEqual(ingredient);

        const actionBun = addIngredient(bun);
        const stateWithBun = constructorReducer(state, actionBun);
        expect(stateWithBun.bun).toEqual(bun);
    });

    it('should remove ingredient from items', () => {
        const stateWithIngredient = constructorReducer(initialState, addIngredient(ingredient));
        const action = removeIngredient('1');
        const stateAfterRemove = constructorReducer(stateWithIngredient, action);
        expect(stateAfterRemove.items).toHaveLength(0);
    });

    it('should update the order of items', () => {
        const ingredient2 = {
            ...ingredient,
            id: '2',
            _id: "2",
            price: 903
        };
        const stateWithItems = constructorReducer(initialState, addIngredient(ingredient));
        const stateWithTwoItems = constructorReducer(stateWithItems, addIngredient(ingredient2));

        const action = updateItemsOrder({ fromIndex: 0, toIndex: 1 });
        const stateAfterUpdate = constructorReducer(stateWithTwoItems, action);
        expect(stateAfterUpdate.items[0]).toEqual(ingredient2);
        expect(stateAfterUpdate.items[1]).toEqual(ingredient);
    });

    it('should restore constructor state', () => {
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
        const stateWithItems = constructorReducer(initialState, addIngredient(ingredient));
        const stateWithBun = constructorReducer(stateWithItems, addIngredient(bun));
        const action = dropAllIngridents();
        const stateAfterDrop = constructorReducer(stateWithBun, action);
        expect(stateAfterDrop.items).toHaveLength(0);
        expect(stateAfterDrop.bun).toBeNull();
    });
});
