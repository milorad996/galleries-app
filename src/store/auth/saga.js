import { takeLatest, call, put } from "redux-saga/effects";
import authService from "../../services/AuthService";
import {
    setActiveUser,
    setToken,
    register,
    login,
    getActiveUser,
    logout,
} from "./slice";



function* handleRegister({ payload }) {
    try {
        const data = yield call(authService.register, payload);
        localStorage.setItem("token", data.token);
        yield put(setActiveUser(data.user));

        yield put(setToken(data.token));
    } catch (error) {
        console.log(error);
        alert("Registration failed");
    }
}
function* handleLogin({ payload }) {
    try {
        const data = yield call(authService.login, payload);
        localStorage.setItem("token", data.token);
        yield put(setActiveUser(data.user));

        yield put(setToken(data.token));
    } catch {
        alert("Invalid credentials");
    }
}
function* handleGetActiveUser() {
    try {
        const activeUser = yield call(authService.getMyProfile);
        yield put(setActiveUser({ ...activeUser }));
    } catch (error) {
        console.log(error);
    }
}
function* handleLogout() {
    try {
        yield call(authService.logout);
        localStorage.removeItem("token");

        yield put(setToken(null));
        yield put(setActiveUser(null));
    } catch (error) {
        console.log(error);
    }
}






export function* watchRegister() {
    yield takeLatest(register.type, handleRegister);
}
export function* watchLogin() {
    yield takeLatest(login.type, handleLogin);
}
export function* watchGetActiveUser() {
    yield takeLatest(getActiveUser.type, handleGetActiveUser);
}
export function* watchLogout() {
    yield takeLatest(logout.type, handleLogout);
}