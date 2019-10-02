import { createSelector } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';

export const AuthState = (state:fromApp.AppState) => state.auth;

export const selectAuthError = createSelector(
    AuthState,
    (state) => state.error
)

export const selectAuthenticationState = createSelector(
    AuthState,
    (state) => state.authenticated
)

export const selectLoggedUser = createSelector(
    AuthState,
    (state) => state.loggedUser
)

export const selectUserID = createSelector(
    AuthState,
    (state) => state.userID
)

export const selectToken = createSelector(
    AuthState,
    (state) => state.tokens
)