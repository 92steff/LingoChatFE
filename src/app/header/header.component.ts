import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
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

  constructor(private store: Store<fromApp.AppState>, private authS: AuthService, private router: Router) { }

  ngOnInit() {
    this.loggedUser$ = this.store.pipe(select(authSelectors.selectLoggedUser));
  }

  logout() {
    this.store.dispatch(new AuthActions.Logout());
    this.authS.logout();
    this.router.navigate(['/']);
  }

}
