export function selectActiveUser(state) {
    return state.auth.user;
}

export function selectIsAuthenticated(state) {
    return !!state.auth.token;
}