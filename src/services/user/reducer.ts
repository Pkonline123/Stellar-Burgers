import { createSlice } from '@reduxjs/toolkit';
import { registrationUsers, loginUsers, logoutUsers, getUserInfo, updateUserInfo } from './thunk';

export interface UserState {
    success: boolean,
    user: null | {
        email: string,
        name: string
    },
}

const initialState: UserState = {
    success: false,
    user: null
};

const UserStateSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addCase(registrationUsers.pending, (state) => {
                state.user = null;
                state.success = false;
            })
            .addCase(registrationUsers.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.success = true;
            })
            .addCase(registrationUsers.rejected, (state) => {
                state.user = null;
                state.success = false;
            })
            .addCase(loginUsers.pending, (state) => {
                state.user = null;
                state.success = false;
            })
            .addCase(loginUsers.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.success = true;
            })
            .addCase(loginUsers.rejected, (state) => {
                state.user = null;
                state.success = false;
            })
            .addCase(logoutUsers.pending, (state) => {
                state.user = null;
                state.success = false;
            })
            .addCase(logoutUsers.fulfilled, (state, action) => {
                state.user = null;
                state.success = false;
            })
            .addCase(logoutUsers.rejected, (state) => {
                state.user = null;
                state.success = false;
            })
            .addCase(getUserInfo.pending, (state) => {
                state.user = null;
                state.success = false;
            })
            .addCase(getUserInfo.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.success = true;
            })
            .addCase(getUserInfo.rejected, (state) => {
                state.user = null;
                state.success = false;
            })
            .addCase(updateUserInfo.pending, (state) => {
                state.user = null;
                state.success = false;
            })
            .addCase(updateUserInfo.fulfilled, (state, action) => {
                state.user = action.payload.user;
                state.success = true;
            })
            .addCase(updateUserInfo.rejected, (state) => {
                state.user = null;
                state.success = false;
            })
    }
});

export default UserStateSlice.reducer;