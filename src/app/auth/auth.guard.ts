import { CanActivate, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as fromApp from '../store/app.reducers';
import * as authSelectors from './store/auth.selectors';

@Injectable({providedIn:'root'})
export class AuthGuardService implements CanActivate {

    constructor(private router:Router, private store:Store<fromApp.AppState>) {}

    canActivate(): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.store.select(authSelectors.selectAuthenticationState).pipe(
            take(1),
            map(isAuth => {
                if (isAuth) return true;
                return this.router.createUrlTree(['/sign-in'])
            })
        )
    }
}