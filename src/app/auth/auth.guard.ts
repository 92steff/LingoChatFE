import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducers';
import * as authSelectors from './store/auth.selectors';;

@Injectable({providedIn:'root'})
export class AuthGuardService implements CanActivate {
    private isAuthenticated:boolean;

    constructor(private router:Router, private store:Store<fromApp.AppState>) {
        this.store.select(authSelectors.selectAuthenticationState)
            .subscribe((res)=> {
                this.isAuthenticated = res;
            })
        }

    canActivate() {
        if (!this.isAuthenticated) {
            this.router.navigate(['sign-in']);
            return false; 
        }
        return true;
    }
}