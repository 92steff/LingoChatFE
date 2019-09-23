import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';
import * as fromApp from '../store/app.reducers';
import * as UserActions from './store/user.actions';
import * as UserSelectors from './store/user.selectors';
import * as AuthSelectors from '../auth/store/auth.selectors';

@Injectable({ providedIn: 'root' })
export class UserService {
  openChats: [];
  friends: User[];
  myId: string;
  sentRequests: string[] | string;

  constructor(private http: HttpClient, private cookieS: CookieService, private store: Store<fromApp.AppState>) {
    if (this.cookieS.check('openChats')) {
      this.openChats = JSON.parse(this.cookieS.get('openChats'));
      this.store.dispatch(new UserActions.RetrieveChats(this.openChats));
    }
    if (this.cookieS.check('userFriends')) {
      this.friends = this.cookieS = JSON.parse(this.cookieS.get('userFriends'));
      this.store.dispatch(new UserActions.SetFriends(this.friends));
    }
    if (this.cookieS.check('sentRequests')) {
      this.sentRequests = this.cookieS = JSON.parse(this.cookieS.get('sentRequests'));
      this.store.dispatch(new UserActions.UpdateSentRequests(this.sentRequests));
    }
    store.select(AuthSelectors.selectUserID)
      .subscribe((id:string) => {
        this.myId = id;
      })
  }

  addFriend(userID:string, friendID:string) {
    return this.http.post(environment.apiEndpoint + 'users/' + userID + '/friendships/' + friendID, {}, {
      observe: 'response'
    });
  }

  getUsers() {
    return this.http.get(environment.apiEndpoint + 'users');
  }

  getFriends(uid) {
    return this.http.get(environment.apiEndpoint + 'users/' + uid + '/friendships', {})
  }

  getFriendRequests() {
    return this.http.get(environment.apiEndpoint + 'users/' + this.myId + '/friendships/', {
      params: new HttpParams().set('status', '0')
    }) 
  }

  getChatMessages(friendID:string) {
    return this.http.get(environment.apiEndpoint + 'users/' + this.myId + '/chats/' + friendID);
  }

  isFriend(userID: string): boolean {
    this.store.select(UserSelectors.selectUserFriends).subscribe((friendsArr) => {
      this.friends = friendsArr;
    })
    const friendsID = this.friends.map((f)=> f.id);
    return friendsID.includes(userID);
  }

}
