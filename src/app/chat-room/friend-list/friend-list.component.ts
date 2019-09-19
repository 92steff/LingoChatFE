import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import * as fromApp from '../../store/app.reducers';
import * as UserActions from '../../user/store/user.actions';
import * as UserSelectors from '../../user/store/user.selectors';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.less']
})

export class FriendListComponent implements OnInit {
  friendsArr:Observable<User[]>

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
    this.friendsArr = this.store.select(UserSelectors.selectUserFriends);
  }

  openChat(friend:User) {
    this.store.dispatch(new UserActions.OpenChat(friend));
    this.router.navigate(['/chat-room']);
  }
}
