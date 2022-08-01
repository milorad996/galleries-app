import { createSlice } from "@reduxjs/toolkit";

const middlewareActions = {
    register() { },
    login() { },
    getActiveUser() { },
    logout() { },
};

const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token"),
        user: {
            id: "",
            first_name: "",
            last_name: "",
        },
        loginError: null,
        registerErrors: null,


    },
    reducers: {
        setActiveUser(state, { payload }) {
            state.user = payload;
        },
        setToken(state, { payload }) {
            state.token = payload;
        },
        setRegisterErrors: (state, { payload }) => {
            state.registerErrors = payload;
        },
        setLoginError: (state, { payload }) => {
            state.loginError = payload;
        },
        ...middlewareActions,
    },
});


export default authSlice.reducer;

export const {
    setActiveUser,
    setToken,
    register,
    login,
    getActiveUser,
    logout,
    setRegisterErrors,
    setLoginError,
} = authSlice.actions;