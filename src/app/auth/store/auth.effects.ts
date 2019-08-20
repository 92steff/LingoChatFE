import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as AuthActions from './auth.actions';

import { map, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthEffects {
    @Effect()
    trySignup = this.actions$.pipe(
        ofType(AuthActions.TRY_SIGNUP),
        map((action: AuthActions.TrySignup) => {
            return action.payload;
        }),
        switchMap((authData: { firstName: string, lastName: string, email: string, password: string }) => {
            return this.http.post('https://lingo-chat-vapor.herokuapp.com/api/users/register', authData, {
                headers: new HttpHeaders().set('Content-Type', 'application/json'),
                observe: 'response'
            })
        }),
        map((res) => {
            if (res.status === 200) {
                return {
                    type: AuthActions.SIGNUP
                }
            } else {
                return {
                    type: AuthActions.DISPLAY_ERROR,
                    payload: res.statusText
                }
            }
        })
    );

    constructor(private actions$: Actions, private http: HttpClient) { }

}