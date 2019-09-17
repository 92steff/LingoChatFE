import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import * as fromApp from '../store/app.reducers';
import * as UserSelectors from '../user/store/user.selectors';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.less']
})

export class ChatRoomComponent implements OnInit {
  openChats$: Observable<User[]>;
  @HostListener('window:beforeunload')
  saveOpenedChats() {
    this.store.select(UserSelectors.selectOpenedChats).subscribe((chats) => {
      this.cookieS.set('openChats', JSON.stringify(chats));
    })
  }

  constructor(private store: Store<fromApp.AppState>, private cookieS: CookieService) { }

  ngOnInit() {
    this.openChats$ = this.store.select(UserSelectors.selectOpenedChats);
  }

}