import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { selectIsAuthenticated } from "../store/auth/selectors";

export default function PublicRoute({ children, ...props }) {
    const isAuthenticated = useSelector(selectIsAuthenticated);
    console.log(isAuthenticated);
    return (
        <Route {...props}>{isAuthenticated ? <Redirect to="/" /> : children}</Route>
    );
}