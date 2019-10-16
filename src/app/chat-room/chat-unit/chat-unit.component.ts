import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { Store } from '@ngrx/store';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import * as fromApp from '../../store/app.reducers';
import * as UserActions from '../../user/store/user.actions';

@Component({
  selector: 'app-chat-unit',
  templateUrl: './chat-unit.component.html',
  styleUrls: ['./chat-unit.component.less']
})
export class ChatUnitComponent implements OnInit {
  @Input('userData') userData: User;
  messages: Message[];

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {}

  exitChat() {
    this.store.dispatch(new UserActions.CloseChat(this.userData.id));
  }

}
