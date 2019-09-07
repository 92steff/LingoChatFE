import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service'

@Injectable({providedIn:'root'})
export class TokenService {

    constructor(private cookieS: CookieService) {}

    public getToken() {
        const data = this.cookieS.get('userData');
        return data['token'];
    }

}