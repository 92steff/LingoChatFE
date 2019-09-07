import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import * as fromApp from '../../store/app.reducers';
import * as UserActions from '../../user/user.actions';
import * as UserSelectors from '../../user/user.selectors';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.less']
})
export class FriendListComponent implements OnInit {
  friendsArr:Observable<Object>

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.dispatch(new UserActions.GetFriends());
    this.friendsArr = this.store.select(UserSelectors.selectUserFriends);
  }

 
  openChat(friend:User) {
    this.store.dispatch(new UserActions.OpenChat(friend));
  }
}
