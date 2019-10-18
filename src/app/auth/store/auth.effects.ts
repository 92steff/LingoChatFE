import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthService } from 'src/app/auth/auth.service';
import { map, switchMap, catchError, finalize, exhaustMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthTokens } from '../../models/authTokens.model';
import { ToastService } from 'src/app/services/toast.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DecodedAccessToken } from 'src/app/models/decodedAccessToken.model';
import { CustomCookieService } from 'src/app/services/customCookie.service';
import { CookieService } from 'ngx-cookie-service';
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
                    exhaustMap((tokens: AuthTokens) => {
                        const decodedToken: DecodedAccessToken = this.decodeToken(tokens.accessToken);
                        this.cookieS.set('tokens', JSON.stringify(tokens));
                        this.customCS.user = decodedToken.user.username;
                        return [
                            new AuthActions.Login({ tokens: tokens, username: decodedToken.user.username, userID: decodedToken.user.id }),
                            new UserActions.SetUserInfo(decodedToken.user)
                        ]
                    }),
                    catchError((err) => {
                        this.ts.add(err.statusText);
                        return throwError(err);
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
                    exhaustMap((tokens: AuthTokens) => {
                        const decodedToken: DecodedAccessToken = this.decodeToken(tokens.accessToken);
                        this.cookieS.set('tokens', JSON.stringify(tokens));
                        this.customCS.user = decodedToken.user.username;
                        return [
                            new AuthActions.Login({ tokens: tokens, username: decodedToken.user.username, userID: decodedToken.user.id }),
                            new UserActions.SetUserInfo(decodedToken.user),
                            new UserActions.GetFriends(),
                            new UserActions.GetFriendRequests(),
                            new UserActions.GetChats()
                        ]
                    }),
                    catchError((err) => {
                        this.ts.add(err.statusText);
                        return throwError(err);
                    }),
                    finalize(() => {
                        this.loader.stopLoader('loginLoader');
                        this.router.navigate(['chat-room'])
                    })
                );
        })
    );

    constructor(private actions$: Actions,
        private router: Router,
        private authService: AuthService,
        private ts: ToastService,
        private loader: NgxUiLoaderService,
        private cookieS: CookieService,
        private customCS: CustomCookieService) { }

    decodeToken(token: string) {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);
        return decodedToken;
    };

}