import { AuthTokens } from 'src/app/models/authTokens.model';
import * as AuthActions from './auth.actions';

export interface State {
    loggedUser: string | null;
    userID: string | null;
    authenticated: boolean;
    error: string | null;
    tokens: AuthTokens;
};

export const initialState: State = {
    loggedUser: null,
    userID: null,
    authenticated: false,
    error: null,
    tokens: {
        accessToken: null,
        refreshToken: null,
        expiredAt: null
    }
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN:
            return {
                ...state,
                loggedUser: action.payload.username,
                tokens: action.payload.tokens,
                userID: action.payload.userID,
                authenticated: true,
                error: null
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                loggedUser: null,
                userId: null,
                tokens: null,
                authenticated: false,
                error: null
            };
        case AuthActions.VERIFY_LOGGED_STATUS:
            return {
                ...state,
                loggedUser: action.payload.user,
                userID: action.payload.userID,
                tokens: action.payload.tokens,
                authenticated: true
            }
        case AuthActions.SET_LOGGED_USER:
            return {
                ...state,
                loggedUser: action.payload
            }
        default:
            return state;
    }
}