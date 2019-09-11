import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import * as fromApp from '../store/app.reducers';
import * as UserActions from './user.actions';

@Injectable({providedIn: 'root'})
export class UserService {
  openChats: [];

  constructor(private http: HttpClient, private cookieS: CookieService, private store: Store<fromApp.AppState>) {
    if (this.cookieS.check('openChats')) {
      this.openChats = JSON.parse(this.cookieS.get('openChats'));
    }
    this.store.dispatch(new UserActions.RetrieveChats(this.openChats));
   }

  getUsers() {
    return this.http.get(environment.apiEndpoint + 'users');
  }

  getFriends(uid) {
    return this.http.get(environment.apiEndpoint + 'users/' + uid + '/friends');
  }

}
