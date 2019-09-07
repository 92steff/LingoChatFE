import { Action } from '@ngrx/store';
import { User } from '../models/user.model';

export const GET_FRIENDS = 'GET_FRIENDS';
export const SET_FRIENDS = 'SET_FRIENDS';
export const OPEN_CHAT = 'OPEN_CHAT';

export class GetFriends implements Action {
    readonly type = GET_FRIENDS;
}

export class SetFriends implements Action {
    readonly type = SET_FRIENDS;

    constructor(public payload: any[]) {}
}

export class OpenChat implements Action {
    readonly type = OPEN_CHAT;

    constructor(public payload: User) {}
}

export type UserActions = GetFriends
    |   SetFriends
    |   OpenChat;