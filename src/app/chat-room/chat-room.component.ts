import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ChatData } from '../models/chatData.model';
import { CustomCookieService } from '../services/customCookie.service';
import { take } from 'rxjs/operators';
import * as fromApp from '../store/app.reducers';
import * as UserSelectors from '../user/store/user.selectors';

@Component({
  selector: 'app-chat-room',
  templateUrl: './chat-room.component.html',
  styleUrls: ['./chat-room.component.less']
})

export class ChatRoomComponent implements OnInit {
  openChats$: Observable<ChatData[]>;
  
  constructor(private store: Store<fromApp.AppState>, private customCS: CustomCookieService) { }

  @HostListener('window:beforeunload')
  saveOpenedChats() {
    this.openChats$.pipe(
      take(1))
      .subscribe(() => {
        this.customCS.storeData();
      })
  }

  ngOnInit() {
    this.openChats$ = this.store.select(UserSelectors.selectOpenedChats);
  }
}