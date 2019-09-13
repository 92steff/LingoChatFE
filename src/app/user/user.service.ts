import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';
import * as fromApp from '../store/app.reducers';
import * as UserActions from './user.actions';
import * as UserSelectors from './user.selectors';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({ providedIn: 'root' })
export class UserService {
  openChats: [];
  friends: User[];

  constructor(private http: HttpClient, private cookieS: CookieService, private store: Store<fromApp.AppState>) {
    if (this.cookieS.check('openChats')) {
      this.openChats = JSON.parse(this.cookieS.get('openChats'));
      this.store.dispatch(new UserActions.RetrieveChats(this.openChats));
    }
    if (this.cookieS.check('userFriends')) {
      this.friends = this.cookieS = JSON.parse(this.cookieS.get('userFriends'));
      this.store.dispatch(new UserActions.SetFriends(this.friends));
    }
  }

  getUsers() {
    return this.http.get(environment.apiEndpoint + 'users');
  }

  getFriends(uid) {
    return this.http.get(environment.apiEndpoint + 'users/' + uid + '/friends');
  }

  isFriend(userID: string): boolean {
    this.store.select(UserSelectors.selectUserFriends).subscribe((friendsArr) => {
      this.friends = friendsArr;
    })
    const friendsID = this.friends.map((f)=> f.id);
    return friendsID.includes(userID);
  }

}
