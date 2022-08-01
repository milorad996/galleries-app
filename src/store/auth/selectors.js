export function selectActiveUser(state) {
    return state.auth.user;
}

export function selectIsAuthenticated(state) {
    return !!state.auth.token;
}
export function selectRegistrationErrors(state) {
    return state.auth.registerErrors;
}
export function selectLoginError(state) {
    return state.auth.loginError;
}