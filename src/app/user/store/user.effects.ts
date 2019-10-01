import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, mergeMap, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';
import { User } from '../../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { from } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { HttpResponse } from '@angular/common/http';
import * as fromApp from '../../store/app.reducers';
import * as UserActions from './user.actions';
import * as AuthSelectors from '../../auth/store/auth.selectors';
import * as UserSelectors from './user.selectors';

@Injectable()
export class UserEffects {
    @Effect()
    getUsers = this.actions$.pipe(
        ofType(UserActions.GET_FRIENDS),
        map((action: UserActions.GetFriends) => {
            return action.payload;
        }),
        switchMap((id: string) => {
            return this.userS.getFriends(id)
                .pipe(
                    map((friends: User[]) => {
                        this.cookieS.set('userFriends', JSON.stringify(friends));
                        return new UserActions.SetFriends(friends);
                    }),
                    catchError((err) => {
                        return from([]);
                    })
                )
        })
    )

    @Effect()
    addFriend = this.actions$.pipe(
        ofType(UserActions.SEND_FRIEND_REQUEST),
        switchMap((action: UserActions.SendFriendRequest) => {
            return this.store.select(AuthSelectors.selectUserID)
                .pipe(
                    map((uid: string) => {
                        return {
                            userID: uid,
                            friend: action.payload
                        }
                    })
                )
        }),
        switchMap((data: { userID: string, friend: User }) => {
            return this.userS.addFriend(data.userID, data.friend.id)
                .pipe(
                    map((res: HttpResponse<Object>) => {
                        if (res.status === 201) {
                            return new UserActions.UpdateSentRequests(data.friend.id);
                            // return new UserActions.UpdateFriends(data.friend);
                        }
                    }),
                    catchError((err: Error) => {
                        this.ts.add(err.message);
                        return from([]);
                    })
                )
        })
    )

    @Effect()
    AcceptFriendRequest = this.actions$.pipe(
        ofType(UserActions.ACCEPT_FRIEND_REQUEST),
        switchMap((action: UserActions.AcceptFriendRequest) => {
            return this.store.select(AuthSelectors.selectUserID)
                .pipe(
                    map((uid: string) => {
                        return {
                            userId: uid,
                            friend: action.payload
                        }
                    })
                )
        }),
        switchMap((data: {userId: string, friend: User }) => {
            return this.userS.acceptFriendRequest(data.userId, data.friend.id)
                .pipe(
                    mergeMap((res: HttpResponse<Object>) => {
                        if (res.status === 200) {
                            if (this.cookieS.check('userFriends')) {
                                const friends: User[] = JSON.parse(this.cookieS.get('userFriends'));
                                friends.push(data.friend);
                                this.cookieS.set('userFriends', JSON.stringify(friends));
                            } else {
                                this.cookieS.set('userFriends', JSON.stringify([data.friend]));
                            }
                            return [
                                new UserActions.UpdateFriends(data.friend),
                                new UserActions.RemoveFriendRequest(data.friend.id)
                            ]
                        }
                    }),
                    catchError((err: Error) => {
                        this.ts.add(err.message);
                        return from([]);
                    }),
                    finalize(() => {
                        return this.store.select(UserSelectors.selectReceivedRequest)
                            .pipe(
                                map(requests =>  {
                                    this.cookieS.delete('receivedRequests');
                                    this.cookieS.set('receivedRequests', JSON.stringify(requests))
                                })
                            )
                    })
                )
        })
    )

    @Effect()
    getFriendRequests = this.actions$.pipe(
        ofType(UserActions.GET_FRIEND_REQUESTS),
        map((action: UserActions.GetFriendRequests) => {
            return action.payload;
        }),
        switchMap((uid: string) => {
            return this.userS.getFriendRequests(uid)
                .pipe(
                    map((req: User[]) => {
                        this.cookieS.set('receivedRequests', JSON.stringify(req));
                        return new UserActions.SetFriendRequests(req);
                    }),
                    catchError((err: Error) => {
                        this.ts.add(err.message);
                        return from([]);
                    })
                )
        })
    )

    @Effect()
    createChat = this.actions$.pipe(
        ofType(UserActions.CREATE_CHAT),
        map((action: UserActions.CreateChat) => {
            return action.payload;
        }),
        switchMap((friendID: string) => {
            return this.userS.getChatMessages(friendID)
        })
    )

    constructor(private actions$: Actions,
        private store: Store<fromApp.AppState>,
        private userS: UserService,
        private cookieS: CookieService,
        private ts: ToastService) { }

}