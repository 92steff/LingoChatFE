import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';


@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient, private cookieS: CookieService) {}

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