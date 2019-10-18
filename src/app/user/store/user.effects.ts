import { Effect, Actions, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map, catchError, mergeMap, finalize } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { UserService } from '../user.service';
import { User } from '../../models/user.model';
import { CookieService } from 'ngx-cookie-service';
import { throwError } from 'rxjs';
import { ToastService } from 'src/app/services/toast.service';
import { HttpResponse } from '@angular/common/http';
import { Chat } from 'src/app/models/chat.model';
import { CustomCookieService } from 'src/app/services/customCookie.service';
import { Message } from 'src/app/models/message.model';
import * as fromApp from '../../store/app.reducers';
import * as UserActions from './user.actions';
import * as AuthSelectors from '../../auth/store/auth.selectors';
import * as UserSelectors from './user.selectors';

@Injectable()
export class UserEffects {
    @Effect()
    getUser = this.actions$.pipe(
        ofType(UserActions.GET_USER),
        map((action: UserActions.GetUser) => {
            return action.payload;
        }),
        switchMap((userID: string) => {
            return this.userS.getUser(userID)
                .pipe(
                    map((user: User) => {
                        this.customCS.userProfile = user;
                        return new UserActions.SetUserInfo(user)
                    }),
                    catchError((err: Error) => throwError(err))
            )
        })
    )

    @Effect()
    getUsers = this.actions$.pipe(
        ofType(UserActions.GET_FRIENDS),
        switchMap(() => {
            return this.userS.getFriends()
                .pipe(
                    map((friends: User[]) => {
                        this.customCS.userFriends = friends;
                        return new UserActions.SetFriends(friends);
                    }),
                    catchError((err) => throwError(err))
                )
        })
    )

    @Effect()
    addFriend = this.actions$.pipe(
        ofType(UserActions.SEND_FRIEND_REQUEST),
        map((action: UserActions.SendFriendRequest) => {
            return action.payload;
        }),
        switchMap((friend: User ) => {
            return this.userS.addFriend(friend.id)
                .pipe(
                    map((res: HttpResponse<Object>) => {
                        if (res.status === 201) {
                            return new UserActions.UpdateSentRequests(friend.id);
                        }
                    }),
                    catchError((err: Error) => {
                        this.ts.add(err.message);
                        return throwError(err);
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
                                this.customCS.updateFriends(data.friend);
                            return [
                                new UserActions.UpdateFriends(data.friend),
                                new UserActions.RemoveFriendRequest(data.friend.id)
                            ]
                        }
                    }),
                    catchError((err: Error) => {
                        this.ts.add(err.message);
                        return throwError(err);
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
    getChats = this.actions$.pipe(
        ofType(UserActions.GET_CHATS),
        switchMap(() => {
            return this.userS.getChats()
                .pipe(
                    map((chats: Chat[]) => {
                        this.customCS.userChats = chats;
                        return new UserActions.SetChats(chats)
                    }),
                    catchError(err => throwError(err))
                )
        })
    )

    @Effect()
    getChat = this.actions$.pipe(
        ofType(UserActions.GET_CHAT),
        map((action: UserActions.GetChat) => {
            return action.payload;
        }),
        switchMap((chat: Chat) => {
            return this.userS.getChatMessages(chat.chat.id)
                .pipe(
                    map((messages: Message[]) => {
                        this.customCS.addToOpenChats({user: chat.participants[0], messages: messages});
                        return new UserActions.OpenChat({user: chat.participants[0], messages: messages})
                    }),
                    catchError(err => throwError(err))
                )
        })
    )

    @Effect()
    createChat = this.actions$.pipe(
        ofType(UserActions.CREATE_CHAT),
        map((action: UserActions.CreateChat) => {
            return action.payload;
        }),
        switchMap((friend: User) => {
            return this.userS.createChat(friend)
                .pipe(
                    map(() => {
                        this.customCS.addToOpenChats({user: friend, messages: []});
                        return new UserActions.OpenChat({user: friend, messages: []});
                    }),
                    catchError(err => throwError(err))
                )
        })
    )

    // @Effect()
    // getMessages = this.actions$.pipe(
    //     ofType(UserActions.GET_MESSAGES),

    // )

    @Effect()
    getFriendRequests = this.actions$.pipe(
        ofType(UserActions.GET_FRIEND_REQUESTS),
        switchMap(() => {
            return this.userS.getFriendRequests()
                .pipe(
                    map((req: User[]) => {
                        this.customCS.receivedRequests = req;
                        return new UserActions.SetFriendRequests(req);
                    }),
                    catchError((err: Error) => {
                        this.ts.add(err.message);
                        return throwError(err);
                    })
                )
        })
    )

    

    constructor(private actions$: Actions,
        private store: Store<fromApp.AppState>,
        private userS: UserService,
        private cookieS: CookieService,
        private ts: ToastService,
        private customCS: CustomCookieService) { }

}