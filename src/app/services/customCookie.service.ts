import { Injectable } from '@angular/core';
import { ChatData } from '../models/chatData.model';
import { Chat } from '../models/chat.model';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DecodedAccessToken } from '../models/decodedAccessToken.model';
import { User } from '../models/user.model';
import * as fromApp from '../store/app.reducers';
import * as UserActions from '../user/store/user.actions';
import * as AuthActions from '../auth/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class CustomCookieService {
    openChats: ChatData[] = [];
    chats: Chat[] = [];
    username: string = null;
    friends: User[] = [];
    sentRequests: string[] = []; // user ids;
    receivedRequests: User[] = [];

    constructor(private cookieS: CookieService, private store: Store<fromApp.AppState>, private jwtHelper: JwtHelperService) {}

    addToOpenChats(chat: ChatData) {
        this.openChats.push(chat);
    }

    closeChat(id: string) {
        const update = this.openChats.filter(chat => chat.user.id !== id);
        this.openChats = [...update];
    }

    set user(username:string) {
        this.username = username;
    }

    set userChats(chats: Chat[]) {
        this.chats = chats;
    }

    set userFriends(friends: User[]) {
        this.friends = friends;
    }

    set userSentRequests(sReq: string[]) {
        this.sentRequests = sReq;
    }

    set userReceivedRequests(req: User[]) {
        this.receivedRequests = req;
    }

    updateFriends(friend: User) {
        this.friends.push(friend);
    }

    storeData() {
        this.cookieS.set('openChats', JSON.stringify(this.openChats));
        this.cookieS.set('userChats', JSON.stringify(this.chats));
        this.cookieS.set('userFriends', JSON.stringify(this.friends));
        this.cookieS.set('sentRequests', JSON.stringify(this.sentRequests));
        this.cookieS.set('receivedRequests', JSON.stringify(this.receivedRequests));
        this.cookieS.set('username', this.username);
    }

    retrieveData() {
        if (this.cookieS.check('tokens')) {
            const tokens = JSON.parse(this.cookieS.get('tokens'));
            this.username = this.cookieS.get('username');
            if (new Date(tokens.expiredAt).getTime() > new Date().getTime()) {
                const token: DecodedAccessToken = this.jwtHelper.decodeToken(tokens.accessToken);
                this.store.dispatch(new AuthActions.VerifyLoggedStatus({user: this.username, tokens: tokens, userID: token.user.id}));
            }
            this.store.dispatch(new UserActions.GetChats()); // data is too big to be stored in cookies, has to be fetched again after page reloads
        }
        if (this.cookieS.check('userFriends')) {
            const userFriends = JSON.parse(this.cookieS.get('userFriends'));
            this.friends = userFriends;
            this.store.dispatch(new UserActions.SetFriends(userFriends));
        }
        if (this.cookieS.check('openChats')) {
            const retrievedOpenChats = JSON.parse(this.cookieS.get('openChats'));
            this.openChats.push(...retrievedOpenChats);
            this.store.dispatch(new UserActions.RetrieveChats(retrievedOpenChats));
        }
        if (this.cookieS.check('sentRequests')) {
            const sentReq = JSON.parse(this.cookieS.get('sentRequests'));
            this.sentRequests = sentReq;
            this.store.dispatch(new UserActions.UpdateSentRequests(sentReq));
        }
        if (this.cookieS.check('receivedRequests')) {
            const receivedReq = JSON.parse(this.cookieS.get('receivedRequests'));
            this.receivedRequests = receivedReq;
            this.store.dispatch(new UserActions.SetFriendRequests(receivedReq));
        }
    }
}