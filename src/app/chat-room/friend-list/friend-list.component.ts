import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';
import { Chat } from 'src/app/models/chat.model';
import { take } from 'rxjs/operators'
import * as fromApp from '../../store/app.reducers';
import * as UserActions from '../../user/store/user.actions';
import * as UserSelectors from '../../user/store/user.selectors';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.less']
})

export class FriendListComponent implements OnInit {
  friendsArr: Observable<User[]>;
  chats: Observable<Chat[]>;

  constructor(private store: Store<fromApp.AppState>, private router: Router) { }

  ngOnInit() {
    this.friendsArr = this.store.select(UserSelectors.selectUserFriends);
    this.chats = this.store.select(UserSelectors.selectChats);
  }

  openChat(friend: User) {
    this.chats.pipe(take(1))
      .subscribe((chats: Chat[]) => {
        const createdChat: Chat = chats.find((chat) => {
          return chat.participants.find((user) => user.id === friend.id)
        })
        if (createdChat) this.store.dispatch(new UserActions.GetChat(createdChat.chat.id))
        else this.store.dispatch(new UserActions.CreateChat(friend))
      })
    // if (createdChat) this.store.dispatch(new UserActions.GetChat(friend));
    // this.router.navigate(['/chat-room']);
  }
}
