import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/auth/auth.service';
import { map, switchMap, catchError, finalize, mergeMap } from 'rxjs/operators';
import { from } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { AuthResponse } from '../../models/authResponse.model';
import { ToastService } from 'src/app/services/toast.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { User } from 'src/app/models/user.model';
import * as AuthActions from './auth.actions';
import * as UserActions from '../../user/store/user.actions';

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
                    mergeMap((res: AuthResponse) => {
                        const user: User = this.extractUser(res.token);
                        this.cookieS.set('userData', JSON.stringify({ user: user.username, token: res.token }));
                        return [
                            new AuthActions.Login({ token: res.token, user: user.username, userID: user.id }),
                            new UserActions.GetFriends(user.id)
                        ]
                    }),
                    catchError((err) => {
                        this.ts.add(err.statusText);
                        return from([]);
                    }),

                    finalize(() => {
                        this.loader.stopLoader('signupLoader');
                        this.router.navigate(['chat-room'])
                    })
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
                    mergeMap((res: AuthResponse) => {
                        const user: User = this.extractUser(res.token);
                        this.cookieS.set('userData', JSON.stringify({ user: user.username, token: res.token }));
                        return [
                            new AuthActions.Login({ token: res.token, user: user.username, userID: user.id }),
                            new UserActions.GetFriends(user.id),
                            new UserActions.GetFriendRequests(user.id)
                        ]
                    }),
                    catchError((err) => {
                        this.ts.add(err.statusText);
                        return from([]);
                    }),

                    finalize(() => { 
                        this.loader.stopLoader('loginLoader');
                        this.router.navigate(['chat-room']) })
                );
        })
    );

    constructor(private actions$: Actions,
         private router: Router, 
         private authService: AuthService,
         private cookieS: CookieService, 
         private ts: ToastService, 
         private loader: NgxUiLoaderService) { }

    extractUser(token: string) {
        const helper = new JwtHelperService();
        const user = helper.decodeToken(token);
        return user;
    };

}