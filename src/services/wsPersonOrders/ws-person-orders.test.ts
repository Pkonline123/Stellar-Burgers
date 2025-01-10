import reducer, { WsPersonOrdersState } from './reducer';

describe('wsPersonOrdersSlice reducer', () => {
    const initialState: WsPersonOrdersState = {
        connected: false,
        orders: [],
        total: 0,
        totalToday: 0,
        error: null,
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: "undefined" })).toEqual(initialState);
    });

    it('should handle CONNECTED', () => {
        const action = { type: 'wsPersonOrders/CONNECTED' };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            connected: true,
        });
    });

    it('should handle DISCONNECTED', () => {
        const currentState = {
            connected: true,
            orders: [{ _id: '1', ingredients: ['1'], status: 'done', name: 'Order 1', createdAt: '', updatedAt: '', number: 1 }],
            total: 100,
            totalToday: 10,
            error: null,
        };
        const action = { type: 'wsPersonOrders/DISCONNECTED' };
        const state = reducer(currentState, action);
        expect(state).toEqual({
            connected: false,
            orders: [],
            total: 0,
            totalToday: 0,
            error: null,
        });
    });

    it('should handle MESSAGE_RECEIVED', () => {
        const action = {
            type: 'wsPersonOrders/MESSAGE_RECEIVED',
            payload: {
                orders: [
                    { _id: '1', ingredients: ['1'], status: 'done', name: 'Order 1', createdAt: '', updatedAt: '', number: 1 },
                    { _id: '2', ingredients: ['2'], status: 'pending', name: 'Order 2', createdAt: '', updatedAt: '', number: 2 },
                ],
                total: 200,
                totalToday: 20,
            },
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            connected: false,
            orders: action.payload.orders,
            total: 200,
            totalToday: 20,
            error: null,
        });
    });

    it('should handle ERROR', () => {
        const action = {
            type: 'wsPersonOrders/ERROR',
            payload: 'Connection failed',
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: 'Connection failed',
        });
    });
});
