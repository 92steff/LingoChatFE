import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserService } from './user.service';
import { User } from '../models/user.model';
import * as fromApp from '../store/app.reducers';
import * as UserActions from '../user/user.actions';
import * as AuthSelectors from '../auth/store/auth.selectors';

@Injectable()
export class UserEffects {
    @Effect()
    getUsers = this.actions$.pipe(
        ofType(UserActions.GET_FRIENDS),
        switchMap(() => {
            return this.store.select(AuthSelectors.selectUserID)
        }),
        switchMap((id: string) => {
            return this.userS.getFriends(id)
                .pipe(
                    map((friends: User[]) => {
                        return new UserActions.SetFriends(friends);
                    })
                )
        })
    )

    constructor(private actions$: Actions, private store: Store<fromApp.AppState>, private userS: UserService) { }

}