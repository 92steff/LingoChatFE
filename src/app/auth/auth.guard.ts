import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as authSelectors from './store/auth.selectors';

@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router:Router, private store:Store<fromApp.AppState>) {}

    private isAuthenticated$ = this.store.pipe(select(authSelectors.selectAuthenticationState));

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.isAuthenticated$) return true;
        else {
            this.router.navigate(['/sign-in']);
            return false;
        }
    }
}