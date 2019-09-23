import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Store, select } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import * as fromApp from '../store/app.reducers';
import * as UserSelectors from '../user/store/user.selectors';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.less']
})

export class ChatRoomComponent implements OnInit {
  openChats$: Observable<User[]>;

  @HostListener('window:beforeunload')
  saveOpenedChats() {
    this.store.pipe(
      select(UserSelectors.selectUserState),
      take(1)
    ).subscribe((userState) => {
      this.cookieS.set('openChats', JSON.stringify(userState.openedChats));
      this.cookieS.set('sentRequests', JSON.stringify(userState.sentRequests)); // temporary solution
    })
  }

  constructor(private store: Store<fromApp.AppState>, private cookieS: CookieService) { }

  ngOnInit() {
    this.openChats$ = this.store.select(UserSelectors.selectOpenedChats);
  }
}