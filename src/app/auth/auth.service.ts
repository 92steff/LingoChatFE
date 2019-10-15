import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthTokens } from '../models/authTokens.model';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient, private store: Store<fromApp.AppState>, private cookieS: CookieService, private jwtHelper: JwtHelperService) {
        if (cookieS.check('tokens')) {
            const tokens: AuthTokens = JSON.parse(cookieS.get('tokens'));
            if  (new Date(tokens.expiredAt).getTime() > new Date().getTime()) {
                const token: AuthTokens = jwtHelper.decodeToken(tokens.accessToken);
                store.dispatch(new AuthActions.VerifyLoggedStatus({
                    user: this.cookieS.get('username'), 
                    tokens: tokens, 
                    userID: token['userID']
                }));
            }
        }
    }

    signup(authData) {
        return this.http.post(environment.apiEndpoint + 'account/', authData, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
    }

    login(encodedCre: string) {
        return this.http.post(environment.apiEndpoint + 'account/login', {}, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Basic ' + encodedCre)
        })
    }

    logout(): void {
        this.cookieS.deleteAll('/');
    }

}