import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as UserSelectors from '../user/user.selectors';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.less']
})
export class ChatRoomComponent implements OnInit {
  openChats$: Observable<User[]>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.openChats$ = this.store.select(UserSelectors.selectOpenedChats);
  }

}
