import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../user/user.service';
import * as fromApp from '../store/app.reducers';
import * as authSelectors from '../auth/store/auth.selectors';
import * as UserSelectors from '../user/store/user.selectors';
import * as AuthActions from '../auth/store/auth.actions';
import * as UserActions from '../user/store/user.actions';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})

export class HeaderComponent implements OnInit {
  loggedUser$: Observable<string | null>;
  usersArr: User[] = [];
  searchUsers: string;

  constructor(private store: Store<fromApp.AppState>, 
    private authS: AuthService, 
    private router: Router, 
    private userS: UserService) {
      userS.getUsers().subscribe((users: []) => {
        this.usersArr = users;
    })
  }

  ngOnInit() {
    this.loggedUser$ = this.store.select(authSelectors.selectLoggedUser);
    document.addEventListener('click', this.clickAway, true);
  }

  checkFriendship(userID: string) {
    return this.userS.isFriend(userID);
  }

  isRequestPending(id:string) {
    let res;
    this.store.select(UserSelectors.selectSentRequest)
      .pipe(take(1))
      .subscribe((requests: string[]) => {
        res = requests.includes(id);
      });
    return res;
  }
  
  clickAway = (event: MouseEvent) => {
    let target = <HTMLSelectElement> event.target;
    const searchArea = document.getElementById('searchArea');
    if (!searchArea.contains(target)) this.searchUsers = '';

    this.store.select(UserSelectors.selectSentRequest)
      .subscribe((r)=> {
        console.log(r);
      })
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    this.authS.logout();
    this.router.navigate(['/']);
    document.removeEventListener('click', this.clickAway, true);
  }

  addFriend(user:User) {
    this.store.dispatch(new UserActions.SendFriendRequest(user));
  }

  isInChatRoom() {
    return this.router.url === '/chat-room';
  }

}
