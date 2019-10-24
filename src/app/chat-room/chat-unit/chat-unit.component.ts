import { Component, OnInit, Input } from '@angular/core';
import { ChatData } from 'src/app/models/chatData.model';
import { Store } from '@ngrx/store';
import { CustomCookieService } from 'src/app/services/customCookie.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import * as fromApp from '../../store/app.reducers';
import * as UserActions from '../../user/store/user.actions';

@Component({
  selector: 'app-chat-unit',
  templateUrl: './chat-unit.component.html',
  styleUrls: ['./chat-unit.component.less']
})
export class ChatUnitComponent implements OnInit {
  @Input('userData') userData: ChatData;
  faPaperPlane = faPaperPlane;

  constructor(private store: Store<fromApp.AppState>, private customCS: CustomCookieService) { }

  ngOnInit() {}

  exitChat() {
    this.customCS.closeChat(this.userData.user.id);
    this.store.dispatch(new UserActions.CloseChat(this.userData.user.id));
  }

}
