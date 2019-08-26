import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const TRY_LOGIN = 'TRY_LOGIN';
export const LOGIN = 'LOGIN';
export const DISPLAY_ERROR = 'DISPLAY_ERROR';

export class TrySignup implements Action {
    readonly type = TRY_SIGNUP;

    constructor(public payload:{firstName:string, lastName:string, email:string, password:string}) {}
}

export class TryLogin implements Action {
    readonly type = TRY_LOGIN;

    constructor(public payload: {email:string, password:string}) {}
}

export class Login implements Action {
    readonly type = LOGIN;
}

export class DisplayError implements Action {
    readonly type = DISPLAY_ERROR;

    constructor(public payload:string) {}
}

export type AuthActions = 
    TrySignup |
    DisplayError |
    TryLogin |
    Login;