import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/services/auth.service';
import { map, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

import * as AuthActions from './auth.actions';


@Injectable()
export class AuthEffects {
    @Effect()
    trySignup = this.actions$.pipe(
        ofType(AuthActions.TRY_SIGNUP),
        map((action: AuthActions.TrySignup) => {
            return action.payload;
        }),
        switchMap((authData) => {
            return this.authService.signup(authData)
                .pipe(
                    map(() => {
                        this.router.navigate(['/']);
                        return new AuthActions.Login();
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
        switchMap((authData: { email: string, password: string }) => {
            const b64 = btoa(authData.email + ':' + authData.password);
            return this.authService.login(b64)
                .pipe(
                    map(() => {
                        this.router.navigate(['/']);
                        return new AuthActions.Login();
                    }),
                    catchError(err =>  of(new AuthActions.DisplayError(err.statusText)))
                );
        })
    )

    constructor(private actions$: Actions, private router: Router, private authService: AuthService) { }

}