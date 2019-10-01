import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';
import * as fromApp from '../store/app.reducers';
import * as UserActions from './store/user.actions';
import * as UserSelectors from './store/user.selectors';

@Injectable({ providedIn: 'root' })
export class UserService {
  friends: User[];
  myId: string;

  constructor(private http: HttpClient, private cookieS: CookieService, private store: Store<fromApp.AppState>) {
    if (this.cookieS.check('openChats')) {
      const openChats = JSON.parse(this.cookieS.get('openChats'));
      this.store.dispatch(new UserActions.RetrieveChats(openChats));
    }
    if (this.cookieS.check('userFriends')) {
      const friends = JSON.parse(this.cookieS.get('userFriends'));
      this.store.dispatch(new UserActions.SetFriends(friends));
    }
    if (this.cookieS.check('sentRequests')) {
      const sentRequests = JSON.parse(this.cookieS.get('sentRequests'));
      this.store.dispatch(new UserActions.UpdateSentRequests(sentRequests));
    }
    if (this.cookieS.check('receivedRequests')) {
      const receivedRequests = JSON.parse(this.cookieS.get('receivedRequests'));
      this.store.dispatch(new UserActions.SetFriendRequests(receivedRequests));
    }
  }

  addFriend(userID:string, friendID:string) {
    return this.http.post(environment.apiEndpoint + 'users/' + userID + '/friendships/' + friendID, {}, {
      observe: 'response'
    });
  }

  getUsers() {
    return this.http.get(environment.apiEndpoint + 'users');
  }

  getFriends(uid: string) {
    return this.http.get(environment.apiEndpoint + 'users/' + uid + '/friendships', {
      params: new HttpParams().set('status', '1')
    })
  }

  getFriendRequests(uid: string) {
    return this.http.get(environment.apiEndpoint + 'users/' + uid + '/friendships/', {
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

  acceptFriendRequest(uid: string, friendId: string) {
    return this.http.put(environment.apiEndpoint + 'users/' + uid + '/friendships/' + friendId, {
     status: 1
    }, {
      observe: 'response'
    })
  }

}
