import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import * as fromApp from '../../store/app.reducers';
import * as UserActions from '../../user/user.actions';
import * as UserSelectors from '../../user/user.selectors';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.less']
})
export class FriendListComponent implements OnInit {
  friendsArr:Observable<User[]>

  constructor(private store: Store<fromApp.AppState>, private cookieS: CookieService) { }

  ngOnInit() {
    this.friendsArr = this.store.select(UserSelectors.selectUserFriends);
  }

  openChat(friend:User) {
    this.store.dispatch(new UserActions.OpenChat(friend));
  }
}
