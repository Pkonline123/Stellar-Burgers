import reducer, { UserState } from './reducer';
import { registrationUsers, loginUsers, logoutUsers, getUserInfo, updateUserInfo } from './thunk';

describe('UserStateSlice reducer', () => {
    const initialState: UserState = {
        success: false,
        user: null,
    };

    it('should return the initial state', () => {
        expect(reducer(undefined, { type: 'unknown' })).toEqual(initialState);
    });

    // Registration tests
    it('should handle registrationUsers.pending', () => {
        const action = { type: registrationUsers.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: false,
            user: null,
        });
    });

    it('should handle registrationUsers.fulfilled', () => {
        const action = {
            type: registrationUsers.fulfilled.type,
            payload: { user: { email: 'test@test.com', name: 'Test User' } },
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: true,
            user: { email: 'test@test.com', name: 'Test User' },
        });
    });

    it('should handle registrationUsers.rejected', () => {
        const action = { type: registrationUsers.rejected.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: false,
            user: null,
        });
    });

    // Login tests
    it('should handle loginUsers.pending', () => {
        const action = { type: loginUsers.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: false,
            user: null,
        });
    });

    it('should handle loginUsers.fulfilled', () => {
        const action = {
            type: loginUsers.fulfilled.type,
            payload: { user: { email: 'test@test.com', name: 'Test User' } },
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: true,
            user: { email: 'test@test.com', name: 'Test User' },
        });
    });

    it('should handle loginUsers.rejected', () => {
        const action = { type: loginUsers.rejected.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: false,
            user: null,
        });
    });

    // Logout tests
    it('should handle logoutUsers.pending', () => {
        const action = { type: logoutUsers.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: false,
            user: null,
        });
    });

    it('should handle logoutUsers.fulfilled', () => {
        const action = { type: logoutUsers.fulfilled.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: false,
            user: null,
        });
    });

    it('should handle logoutUsers.rejected', () => {
        const action = { type: logoutUsers.rejected.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: false,
            user: null,
        });
    });

    // Get user info tests
    it('should handle getUserInfo.pending', () => {
        const action = { type: getUserInfo.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: false,
            user: null,
        });
    });

    it('should handle getUserInfo.fulfilled', () => {
        const action = {
            type: getUserInfo.fulfilled.type,
            payload: { user: { email: 'test@test.com', name: 'Test User' } },
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: true,
            user: { email: 'test@test.com', name: 'Test User' },
        });
    });

    it('should handle getUserInfo.rejected', () => {
        const action = { type: getUserInfo.rejected.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: false,
            user: null,
        });
    });

    // Update user info tests
    it('should handle updateUserInfo.pending', () => {
        const action = { type: updateUserInfo.pending.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: false,
            user: null,
        });
    });

    it('should handle updateUserInfo.fulfilled', () => {
        const action = {
            type: updateUserInfo.fulfilled.type,
            payload: { user: { email: 'test@test.com', name: 'Updated User' } },
        };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: true,
            user: { email: 'test@test.com', name: 'Updated User' },
        });
    });

    it('should handle updateUserInfo.rejected', () => {
        const action = { type: updateUserInfo.rejected.type };
        const state = reducer(initialState, action);
        expect(state).toEqual({
            success: false,
            user: null,
        });
    });
});
