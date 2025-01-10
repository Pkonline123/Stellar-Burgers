import reducer, { CurrentOrder, dropCurentOrder, initialState } from './reducer';
import { getCurrentOrder } from './thunk';

describe('CurrentOrderSlice', () => {
  
    const mockOrder: CurrentOrder = {
        _id: "1",
        ingredients: ["ingredient1", "ingredient2"],
        owner: "owner1",
        status: "done",
        name: "Order 1",
        createdAt: "2025-01-01T00:00:00Z",
        updatedAt: "2025-01-01T01:00:00Z",
        number: 12345,
    };

    it('should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle dropCurentOrder', () => {
        const stateWithOrder = {
            status: 'succeeded',
            orders: mockOrder,
            error: '',
        };

        const state = reducer(stateWithOrder, dropCurentOrder());

        expect(state).toEqual(initialState);
    });

    it('should handle getCurrentOrder.pending', () => {
        const action = { type: getCurrentOrder.pending.type };
        const state = reducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            status: 'loading',
        });
    });

    it('should handle getCurrentOrder.fulfilled', () => {
        const mockPayload = {
            orders: [mockOrder],
        };

        const action = {
            type: getCurrentOrder.fulfilled.type,
            payload: mockPayload,
        };

        const state = reducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            status: 'succeeded',
            orders: mockOrder,
        });
    });

    it('should handle getCurrentOrder.rejected', () => {
        const action = {
            type: getCurrentOrder.rejected.type,
            error: { message: 'Ошибка загрузки заказа' },
        };

        const state = reducer(initialState, action);

        expect(state).toEqual({
            ...initialState,
            status: 'error',
            error: 'Ошибка загрузки заказа',
        });
    });
});
