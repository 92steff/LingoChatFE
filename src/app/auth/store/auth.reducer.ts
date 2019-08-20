import * as AuthActions from './auth.actions';

export interface State {
    token: string | null;
    authenticated: boolean;
    error: string | null;
};

export const initialState: State = {
    token: null,
    authenticated: false,
    error: null
};

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
    switch(action.type) {
        case AuthActions.SIGNUP:
            return {
                ...state,
                authenticated:true,
                error: null
            };
        case AuthActions.DISPLAY_ERROR:
            return {
                ...state,
                authenticated:false,
                error: action.payload
            };
        default:
            return state;
    }
}