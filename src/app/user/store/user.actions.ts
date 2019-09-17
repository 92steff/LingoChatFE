import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export const ADD_FRIEND = 'ADD_FRIEND';
export const GET_FRIENDS = 'GET_FRIENDS';
export const SET_FRIENDS = 'SET_FRIENDS';
export const UPDATE_FRIENDS = 'UPDATE_FRIENDS';
export const OPEN_CHAT = 'OPEN_CHAT';
export const RETRIEVE_CHATS = 'RETRIEVE_CHATS';
export const CLOSE_CHAT = 'CLOSE_CHAT';

export class AddFriend implements Action {
    readonly type = ADD_FRIEND;

    constructor(public payload: User) {}
}

export class GetFriends implements Action {
    readonly type = GET_FRIENDS;
}

export class SetFriends implements Action {
    readonly type = SET_FRIENDS;

    constructor(public payload: any[]) {}
}

export class UpdateFriends implements Action {
    readonly type = UPDATE_FRIENDS;

    constructor(public payload: User) {}
}

export class OpenChat implements Action {
    readonly type = OPEN_CHAT;

    constructor(public payload: User) {}
}

export class RetrieveChats implements Action {
    readonly type = RETRIEVE_CHATS;

    constructor(public payload: User[]) {}
}

export class CloseChat implements Action {
    readonly type = CLOSE_CHAT;

    constructor(public payload: string) {}
}

export type UserActions = AddFriend
    |   GetFriends
    |   SetFriends
    |   UpdateFriends
    |   OpenChat
    |   RetrieveChats
    |   CloseChat;