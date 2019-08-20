import { Action } from '@ngrx/store';

export const TRY_SIGNUP = 'TRY_SIGNUP';
export const SIGNUP = 'SIGNUP';
export const DISPLAY_ERROR = 'DISPLAY_ERROR';

export class TrySignup implements Action {
    readonly type = TRY_SIGNUP;

    constructor(public payload:{firstName:string, lastName:string, email:string, password:string}) {}
}

export class Signup implements Action {
    readonly type = SIGNUP;
}

export class DisplayError implements Action {
    readonly type = DISPLAY_ERROR;

    constructor(public payload:string) {}
}

export type AuthActions = 
    TrySignup |
    Signup |
    DisplayError;