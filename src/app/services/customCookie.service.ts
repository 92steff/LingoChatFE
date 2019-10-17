import { Injectable } from '@angular/core';
import { ChatData } from '../models/chatData.model';
import { Chat } from '../models/chat.model';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { AuthTokens } from '../models/authTokens.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedAccessToken } from '../models/decodedAccessToken.model';
import * as fromApp from '../store/app.reducers';
import * as UserActions from '../user/store/user.actions';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class CustomCookieService {
    openChats: ChatData[] = [];
    chats: Chat[] = [];
    authTokens: AuthTokens = null;
    username: string = null;

    constructor(private cookieS: CookieService, private store: Store<fromApp.AppState>, private jwtHelper: JwtHelperService) {}

    addToOpenChats(chat: ChatData) {
        this.openChats.push(chat);
    }

    closeChat(id: string) {
        const update = this.openChats.filter(chat => chat.user.id !== id);
        this.openChats = [...update];
    }

    set tokens(tokens: AuthTokens) {
        this.authTokens = tokens;
    }

    set user(username:string) {
        this.username = username;
    }

    storeData() {
        this.cookieS.set('openChats', JSON.stringify(this.openChats));
        this.cookieS.set('userChats', JSON.stringify(this.chats));
    }

    retrieveData() {
        this.store.dispatch(new UserActions.GetChats()); // data is too big to be stored in cookies, has to be fetched again after page reloads
        if (this.cookieS.check('openChats')) {
            const retrievedOpenChats = JSON.parse(this.cookieS.get('openChats'));
            this.openChats.push(...retrievedOpenChats);
            this.store.dispatch(new UserActions.RetrieveChats(retrievedOpenChats));
        }
        if (this.cookieS.check('tokens')) {
            const tokens = JSON.parse(this.cookieS.get('tokens'));
            this.authTokens = tokens;
            if (new Date(tokens.expiredAt).getTime() > new Date().getTime()) {
                const token: DecodedAccessToken = this.jwtHelper.decodeToken(tokens.accessToken);
                this.store.dispatch(new AuthActions.VerifyLoggedStatus({
                    user: this.username, 
                    tokens: tokens, 
                    userID: token.user.id
                }));
            }
        }
    }
}