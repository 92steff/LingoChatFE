import * as AuthActions from './auth.actions';

export interface State {
    loggedUser: string | null;
    token: string | null;
    authenticated: boolean;
    error: string | null;
};

export const initialState: State = {
    loggedUser: null,
    token: null,
    authenticated: false,
    error: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch (action.type) {
        case AuthActions.LOGIN:
            return {
                ...state,
                loggedUser: action.payload.user,
                token: action.payload.token,
                authenticated: true,
                error: null
            };
        case AuthActions.LOGOUT:
            return {
                ...state,
                loggedUser: null,
                token: null,
                authenticated: false,
                error: null
            };
        case AuthActions.DISPLAY_ERROR:
            return {
                ...state,
                authenticated: false,
                error: action.payload
            };
        default:
            return state;
    }
}