import reducer, { initialState } from './reducer';
import { order } from '../../utils/test-constants';

describe('wsOrderAllSlice reducer', () => {

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: 'undefined' })).toEqual(initialState);
    });

    it('should handle CONNECTED', () => {
        const action = { type: 'wsOrderAll/CONNECTED' };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            connected: true,
        });
    });

    it('should handle DISCONNECTED', () => {
        const currentState = {
            connected: true,
            orders: [
                order
            ],
            total: 100,
            totalToday: 10,
            error: null,
        };
        const action = { type: 'wsOrderAll/DISCONNECTED' };
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
        const order2 = {
            ...order,
            _id: '2',
            ingredients: ['2'],
            status: 'pending',
            name: 'Order 2',
            number: 2
        };
        const action = {
            type: 'wsOrderAll/MESSAGE_RECEIVED',
            payload: {
                orders: [
                    order,
                    order2,
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
            type: 'wsOrderAll/ERROR',
            payload: 'Connection failed',
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            ...initialState,
            error: 'Connection failed',
        });
    });
});
