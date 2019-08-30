import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient) { }

    signup(authData) {
        return this.http.post(environment.apiEndpoint + 'users/register', authData, {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
            observe: 'response'
        })
    }

    login(encodedCre: string) {
        return this.http.post(environment.apiEndpoint + 'users/login', {}, {
            headers: new HttpHeaders()
                .set('Content-Type', 'application/json')
                .set('Authorization', 'Basic ' + encodedCre)
        })
    }

}