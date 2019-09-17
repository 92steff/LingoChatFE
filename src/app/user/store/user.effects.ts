import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';
import { User } from '../../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import * as fromApp from '../../store/app.reducers';
import * as UserActions from './user.actions';
import * as AuthSelectors from '../../auth/store/auth.selectors';
import { HttpResponse } from '@angular/common/http';
import { pipe, throwError, from } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';

@Injectable()
export class UserEffects {
    @Effect()
    getUsers = this.actions$.pipe(
        ofType(UserActions.GET_FRIENDS),
        switchMap(() => {
            return this.store.select(AuthSelectors.selectUserID);
        }),
        switchMap((id: string) => {
            return this.userS.getFriends(id)
                .pipe(
                    map((friends: User[]) => {
                        this.cookieS.set('userFriends', JSON.stringify(friends));
                        return new UserActions.SetFriends(friends);
                    })
                )
        })
    )

    @Effect()
    addFriend = this.actions$.pipe(
        ofType(UserActions.ADD_FRIEND),
        map((action: UserActions.AddFriend) => {
            return action.payload;
        }),
        switchMap((user:User) => {
            return this.store.select(AuthSelectors.selectUserID)
                .pipe(
                    map((uid) => {
                        return {
                            userID: uid,
                            friend: user
                        }
                    })
                )
        }),
        switchMap((data:{userID:string, friend:User}) => {
            return this.userS.addFriend(data.userID, data.friend.id)
                .pipe(
                    map((res:HttpResponse<Object>) => {
                        return new UserActions.UpdateFriends(data.friend);
                        
                    }),
                    catchError((err: Error)=> {
                        this.ts.add(err.message)
                        return from([]);
                    })
                )
        })
    )

    constructor(private actions$: Actions, 
        private store: Store<fromApp.AppState>, 
        private userS: UserService, 
        private cookieS: CookieService,
        private ts: ToastService) { }

}