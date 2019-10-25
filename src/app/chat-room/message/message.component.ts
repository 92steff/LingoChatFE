import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/message.model';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as fromApp from '../../store/app.reducers';
import * as AuthSelectors from '../../auth/store/auth.selectors';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: Message;
  isOwnContent: boolean;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.store.select(AuthSelectors.selectUserID).pipe(take(1)).subscribe(
      (uid: string) => this.isOwnContent = uid === this.chatMessage.userId
    )
  }

}
