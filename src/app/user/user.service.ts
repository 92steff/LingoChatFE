import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import * as AuthSelectors from '../auth/store/auth.selectors';
import * as fromApp from '../store/app.reducers';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private store: Store<fromApp.AppState>) { }

  getUsers() {
    return this.http.get(environment.apiEndpoint + 'users');
  }

  getFriends(uid) {
    // let uid: string;
    // this.store.select(AuthSelectors.selectUserID).subscribe(
    //   (res) => {
    //     uid = res
    //   }
    // )
    return this.http.get(environment.apiEndpoint + 'users/' + uid + '/friends');
  }

}
