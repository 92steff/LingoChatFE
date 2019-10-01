import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { UserService } from '../user/user.service';
import { take } from 'rxjs/operators';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import * as fromApp from '../store/app.reducers';
import * as authSelectors from '../auth/store/auth.selectors';
import * as UserSelectors from '../user/store/user.selectors';
import * as AuthActions from '../auth/store/auth.actions';
import * as UserActions from '../user/store/user.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})

export class HeaderComponent implements OnInit {
  loggedUser$: Observable<string | null>;
  usersArr: User[] = [];
  searchUsers: string;
  isNtfOpen: boolean = false;
  faBell = faBell;
  friendRequests: Observable<User[]>;

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
    this.friendRequests = this.store.select(UserSelectors.selectReceivedRequest);
  }

  checkFriendship(userID: string) {
    return this.userS.isFriend(userID);
  }

  isRequestPending(id:string) {
    let res:boolean;
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
  }

  acceptFriendship(friend: User) {
    this.store.dispatch(new UserActions.AcceptFriendRequest(friend));
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    this.authS.logout();
    this.router.navigate(['/sign-in']);
    document.removeEventListener('click', this.clickAway, true);
  }

  addFriend(user:User) {
    this.store.dispatch(new UserActions.SendFriendRequest(user));
    this.store.dispatch(new UserActions.UpdateSentRequests(user.id));
  }

  isInChatRoom() {
    return this.router.url === '/chat-room';
  }

}
