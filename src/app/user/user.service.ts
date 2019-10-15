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
      this.store.dispatch(new UserActions.RetrieveChats(JSON.parse(this.cookieS.get('openChats'))));
    }
    if (this.cookieS.check('userFriends')) {
      this.store.dispatch(new UserActions.SetFriends(JSON.parse(this.cookieS.get('userFriends'))));
    }
    if (this.cookieS.check('sentRequests')) {
      this.store.dispatch(new UserActions.UpdateSentRequests(JSON.parse(this.cookieS.get('sentRequests'))));
    }
    if (this.cookieS.check('receivedRequests')) {
      this.store.dispatch(new UserActions.SetFriendRequests(JSON.parse(this.cookieS.get('receivedRequests'))));
    }
  }

  addFriend(friendID:string) {
    return this.http.post(environment.apiEndpoint + 'friendships/' + friendID, {}, {
      observe: 'response'
    });
  }

  getUsers() {
    return this.http.get(environment.apiEndpoint + 'users');
  }

  getUser(uid: string) {
    return this.http.get(environment.apiEndpoint + 'users/' + uid);
  }

  getFriends() {
    return this.http.get(environment.apiEndpoint + 'friendships/', {
      params: new HttpParams().set('status', '1')
    })
  }

  getFriendRequests() {
    return this.http.get(environment.apiEndpoint + 'friendships/', {
      params: new HttpParams().set('status', '0')
    }) 
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

  getChats() {
    return this.http.get(environment.apiEndpoint + 'chats');
  }

  getChatMessages(chatId: string) {
    return this.http.get(environment.apiEndpoint + 'chats/' + chatId + '/messages');
  }

  createChat(friend: User) {
    return this.http.post(environment.apiEndpoint + 'chats/', {
      name: friend.firstName + friend.lastName,
      participants: [friend]
    });
  }

}
