import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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
  @ViewChild('inputFieldMsg', {static: true}) message: ElementRef;
  faPaperPlane = faPaperPlane;

  constructor(private store: Store<fromApp.AppState>, private customCS: CustomCookieService) { }

  ngOnInit() {}

  exitChat() {
    this.customCS.closeChat(this.userData.user.id);
    this.store.dispatch(new UserActions.CloseChat(this.userData.user.id));
  }

  onSend() {
    this.store.dispatch(new UserActions.SendMessage({chatId: this.userData.chatId, message: this.message.nativeElement.value}));
    this.message.nativeElement.value = null;
  }
  
  onSubmit(event) {
    if (event.keyCode === 13) {
      this.onSend();
    }
  }

}
