import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const TRY_LOGIN = 'TRY_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const DISPLAY_ERROR = 'DISPLAY_ERROR';
export const VERIFY_LOGGED_STATUS = 'VERIFY_LOGGED_STATUS';

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

    constructor(public payload: {token: string, user: string, userID: string}) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class DisplayError implements Action {
    readonly type = DISPLAY_ERROR;

    constructor(public payload:string) {}
}

export class VerifyLoggedStatus implements Action {
    readonly type = VERIFY_LOGGED_STATUS;

    constructor(public payload: {user: string, token: string, userID: string}) {}
}

export type AuthActions = TrySignup 
    |   DisplayError 
    |   TryLogin 
    |   Login
    |   Logout
    |   VerifyLoggedStatus;