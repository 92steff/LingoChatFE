import { Action } from '@ngrx/store';
import { AuthTokens } from 'src/app/models/authTokens.model';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const TRY_LOGIN = 'TRY_LOGIN';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const VERIFY_LOGGED_STATUS = 'VERIFY_LOGGED_STATUS';
export const SET_LOGGED_USER = 'SET_LOGGED_USER';

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

    constructor(public payload: {tokens: AuthTokens, username: string, userID: string}) {}
}

export class Logout implements Action {
    readonly type = LOGOUT;
}

export class VerifyLoggedStatus implements Action {
    readonly type = VERIFY_LOGGED_STATUS;

    constructor(public payload: {user: string, tokens: AuthTokens, userID: string}) {}
}

export class SetLoggedUser implements Action {
    readonly type = SET_LOGGED_USER;

    constructor(public payload: string) {}
}

export type AuthActions = TrySignup 
    |   TryLogin 
    |   Login
    |   Logout
    |   VerifyLoggedStatus
    |   SetLoggedUser;