import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/user/user.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as UserActions from '../../user/store/user.actions';

@Component({
  selector: 'app-chat-unit',
  templateUrl: './chat-unit.component.html',
  styleUrls: ['./chat-unit.component.less']
})
export class ChatUnitComponent implements OnInit {
  @Input('userData') userData: User;

  constructor(private store: Store<fromApp.AppState>, private userS: UserService) { }

  ngOnInit() {
  }

  exitChat() {
    this.store.dispatch(new UserActions.CloseChat(this.userData.id));
  }

}
