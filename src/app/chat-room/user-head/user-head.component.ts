import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducers';
import * as UserActions from '../../user/user.actions';

@Component({
  selector: 'app-user-head',
  templateUrl: './user-head.component.html',
  styleUrls: ['./user-head.component.less']
})
export class UserHeadComponent implements OnInit {
  @Input('user') user: User;
  @Input('parent') parent: string;
  friends: User[];
  isFriend = false;

  constructor(private cookieS: CookieService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    if (this.cookieS.check('userFriends')) {
      this.friends = JSON.parse(this.cookieS.get('userFriends'));
      const idsArr = this.friends.map(((fri) => fri.id));
      if (idsArr.includes(this.user.id)) this.isFriend = true;
    }
  }

  exitChat() {
    this.store.dispatch(new UserActions.CloseChat(this.user.id));
  }

}
