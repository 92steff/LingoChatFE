import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import * as AuthActions from './auth.actions';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

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
                .pipe(
                    map(() => {
                        this.router.navigate(['/']);
                        return new AuthActions.Login;
                    }),
                    catchError(err => of(new AuthActions.DisplayError(err.statusText)))
                );
        })
    )

    @Effect()
    tryLogin = this.actions$.pipe(
        ofType(AuthActions.TRY_LOGIN),
        map((action: AuthActions.TryLogin) => {
            return action.payload;
        }),
        switchMap( (authData: { email: string, password: string }) => {
            const b64 = btoa(authData.email + ':' + authData.password);
            return this.http.post('https://lingo-chat-vapor.herokuapp.com/api/users/login', {}, {
                headers: new HttpHeaders().set('Content-Type', 'application/json')
                                          .set('Authorization', 'Basic ' + b64)
            })
                .pipe(
                    map((req) => {
                        console.log(req);
                        this.router.navigate(['/']);
                        return new AuthActions.Login;
                    }),
                    catchError(err => {
                        return of(new AuthActions.DisplayError(err.statusText)) })
                )
        })

    )

    private handleResponse(res) {
        if (res.status >= 200 && res.status <= 299) {
            this.router.navigate(['/']);
            return {
                type: AuthActions.LOGIN
            }
        } else {
            return {
                type: AuthActions.DISPLAY_ERROR,
                payload: res.statusText
            }
        }
    }

    constructor(private actions$: Actions, private http: HttpClient, private router: Router) { }

}