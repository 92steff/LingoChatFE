import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { User } from '../models/user.model';
import { take } from 'rxjs/operators';
import * as fromApp from '../store/app.reducers';
import * as UserSelectors from './store/user.selectors';

@Injectable({ providedIn: 'root' })
export class UserService {
  friends;
  myId: string;

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) {}

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
    this.store.select(UserSelectors.selectUserFriends).pipe(take(1)).subscribe((friendsArr) => {
      this.friends = friendsArr;
    })
    return this.friends.map((f)=> f.friend.id).includes(userID);
  }

  acceptFriendRequest(uid: string, friendId: string) {
    return this.http.put(environment.apiEndpoint + 'users/' + uid + '/friendships/' + friendId, {
     status: 1
    }, {
      observe: 'response'
    })
  }

  sendMessage(chatId: string, message: string) {
    return this.http.post(environment.apiEndpoint + 'chats/' + chatId, {
      text: message
    }, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
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
