import { createSelector } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';

export const AuthState = (state:fromApp.AppState) => state.auth;

export const selectAuthError = createSelector(
    AuthState,
    (state) => state.error
)