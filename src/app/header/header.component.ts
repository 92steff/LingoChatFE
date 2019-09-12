import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import * as fromApp from '../store/app.reducers';
import * as authSelectors from '../auth/store/auth.selectors';
import * as AuthActions from '../auth/store/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})

export class HeaderComponent implements OnInit {
  loggedUser$: Observable<string | null>;
  usersArr = [];
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
    document.addEventListener('click', (event) => {
      let target = <HTMLSelectElement> event.target;
      const searchArea = document.getElementById('searchArea');
      if (!searchArea.contains(target)) this.searchUsers = '';
    })
  }

  checkFriendship(userID: string) {
    return this.userS.isFriend(userID);
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    this.authS.logout();
    this.router.navigate(['/']);
  }
  
}
