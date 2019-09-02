import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as fromApp from '../store/app.reducers';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient, store: Store<fromApp.AppState>, private cookieS: CookieService, private jwtHelper: JwtHelperService) {
        if (cookieS.check('userData')) {
            const userData = JSON.parse(cookieS.get('userData'));
            if (userData.user && !jwtHelper.isTokenExpired(userData.token)) {
                store.dispatch(new AuthActions.VerifyLoggedStatus({user: userData.user, token: userData.token}));
            }
        }
    }

    signup(authData) {
        return this.http.post(environment.apiEndpoint + 'users/register', authData, {
            headers: new HttpHeaders().set('Content-Type', 'application/json')
        })
    }

    login(encodedCre: string) {
        return this.http.post(environment.apiEndpoint + 'users/login', {}, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Basic ' + encodedCre)
        })
    }

    logout(): void {
        this.cookieS.delete('userData');
    }

}