import { createAsyncThunk } from '@reduxjs/toolkit'
import requestWrapper from '../../utils/requestWrapper';

const urlRegistration = "https://norma.nomoreparties.space/api/auth/register";
const urlLogin = "https://norma.nomoreparties.space/api/auth/login";
const urlForgotPassword = "https://norma.nomoreparties.space/api/password-reset";
const urlResetPassword = "https://norma.nomoreparties.space/api/password-reset/reset";
const urlUserLogout = "https://norma.nomoreparties.space/api/auth/logout";
const urlGetUserInfo = "https://norma.nomoreparties.space/api/auth/user";
const urlUpdateUserInfo = "https://norma.nomoreparties.space/api/auth/user";
const refreshUserToken = "https://norma.nomoreparties.space/api/auth/token";

interface UserResponse {
    success: boolean,
    user: null | {
        email: string,
        name: string
    },
    accessToken: string,
    refreshToken: string
}

interface UserForgotPassword {
    success: boolean,
    message: string
}

export const registrationUsers = createAsyncThunk(
    'users/userInfoRegistration',
    async (userInfo: { email: string, password: string, name: string }) => {
        const result = await requestWrapper<UserResponse>(() =>
            fetch(urlRegistration, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    userInfo
                )
            })
        );
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        return result;
    }
)

export const loginUsers = createAsyncThunk(
    'users/userInfoLogin',
    async (userInfo: { email: string, password: string }) => {
        const result = await requestWrapper<UserResponse>(() =>
            fetch(urlLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    userInfo
                )
            })
        );
        localStorage.setItem("accessToken", result.accessToken);
        localStorage.setItem("refreshToken", result.refreshToken);
        return result;
    }
)

export const forgotPasswordUsers = createAsyncThunk(
    'users/userInfoForgotPassword',
    async (userInfo: { email: string }) => {
        const result = await requestWrapper<UserForgotPassword>(() =>
            fetch(urlForgotPassword, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    userInfo
                )
            })
        );
        return result;
    }
)

export const resetPasswordUsers = createAsyncThunk(
    'users/userInfoResetPassword',
    async (userInfo: { password: string, token: string }) => {
        const result = await requestWrapper<UserForgotPassword>(() =>
            fetch(urlResetPassword, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    userInfo
                )
            })
        );
        return result;
    }
)

export const logoutUsers = createAsyncThunk(
    'users/userInfoLogout',
    async (userInfo: { token: string }) => {
        const result = await requestWrapper<UserResponse>(() =>
            fetch(urlUserLogout, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(
                    userInfo
                )
            })
        );
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return result;
    }
)

export const getUserInfo = createAsyncThunk(
    'users/userGetInfo',
    async () => {
        const result = await fetchWithRefresh(urlGetUserInfo, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem("accessToken") || '',
            },
        })

        return result as UserResponse;
    }
)

export const updateUserInfo = createAsyncThunk(
    'users/updateUserInfo',
    async (userInfo: { name: string; email: string; password?: string }) => {
        const result = await fetchWithRefresh(urlUpdateUserInfo, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                authorization: localStorage.getItem("accessToken") || '',
            },
            body: JSON.stringify({
                name: userInfo.name,
                email: userInfo.email,
                ...(userInfo.password && { password: userInfo.password }),
            }),
        })
        return result as UserResponse;
    }
)

const checkReponse = (res: Response) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const refreshToken = () => {
    return fetch(refreshUserToken, {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            token: localStorage.getItem("refreshToken"),
        }),
    })
        .then(checkReponse)
        .then((refreshData) => {
            if (!refreshData.success) {
                return Promise.reject(refreshData);
            }
            localStorage.setItem("refreshToken", refreshData.refreshToken);
            localStorage.setItem("accessToken", refreshData.accessToken);
            return refreshData;
        });
};

export const fetchWithRefresh = async (url: string, options: RequestInit) => {
    try {
        const res = await fetch(url, options);
        return await checkReponse(res);
    } catch (err) {
        const error = err as Error;
        if (error.message === "jwt expired") {
            const refreshData = await refreshToken();
            (options.headers as Record<string, string>).authorization = refreshData.accessToken;
            const res = await fetch(url, options);
            return await checkReponse(res);
        } else {
            return Promise.reject(err);
        }
    }
};
