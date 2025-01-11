import reducer, { initialState } from './reducer';
import { fetchOrders } from './thunk';

describe('OrderStateSlice', () => {

    it('should handle initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    it('should handle fetchOrders.pending', () => {
        const action = { type: fetchOrders.pending.type };
        const state = reducer(initialState, action);

        expect(state).toEqual({
            name: "",
            order: null,
            success: false,
            isLoading: true,
        });
    });

    it('should handle fetchOrders.fulfilled', () => {
        const mockPayload = {
            name: "OrderName",
            order: { number: 12345 },
        };
        const action = {
            type: fetchOrders.fulfilled.type,
            payload: mockPayload,
        };
        const state = reducer(initialState, action);

        expect(state).toEqual({
            name: "OrderName",
            order: { number: 12345 },
            success: true,
            isLoading: false,
        });
    });

    it('should handle fetchOrders.rejected', () => {
        const action = { type: fetchOrders.rejected.type };
        const state = reducer(initialState, action);

        expect(state).toEqual({
            name: "",
            order: null,
            success: false,
            isLoading: false,
        });
    });
});
