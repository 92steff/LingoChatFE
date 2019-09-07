import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/auth/auth.service';
import { map, switchMap, catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { AuthResponse } from '../../models/authResponse.model';
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
                    map((res: AuthResponse) => {
                        const username = this.extractUser(res);
                        this.cookieS.set('userData', JSON.stringify({ user: username, token: res.token }));
                        return new AuthActions.Login({ token: res.token, user: username, userID: res.userID });
                    }),
                    catchError(err => of(new AuthActions.DisplayError(err.statusText))),

                    finalize(() => { this.router.navigate(['/']) })
                );
        })
    );

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
                    map((res: AuthResponse) => {
                        const username = this.extractUser(res);
                        this.cookieS.set('userData', JSON.stringify({ user: username, token: res.token }));
                        return new AuthActions.Login({ token: res.token, user: username, userID: res.userID });
                    }),
                    catchError(err => of(new AuthActions.DisplayError(err.statusText))),

                    finalize(() => { this.router.navigate(['/']) })
                );
        })
    );

    constructor(private actions$: Actions, private router: Router, private authService: AuthService, private cookieS: CookieService) { }

    extractUser(res: AuthResponse) {
        const helper = new JwtHelperService();
        const token = helper.decodeToken(res.token);
        const user = token['firstName'];
        return user;
    };

}