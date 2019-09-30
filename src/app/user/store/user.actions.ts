import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';

export const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST';
export const GET_FRIEND_REQUESTS = 'GET_FRIEND_REQUESTS';
export const SET_FRIEND_REQUESTS = 'SET_FRIEND_REQUESTS';
export const GET_FRIENDS = 'GET_FRIENDS';
export const SET_FRIENDS = 'SET_FRIENDS';
export const UPDATE_SENT_REQUESTS = 'UPDATE_PENDING_REQUESTS';
export const UPDATE_FRIENDS = 'UPDATE_FRIENDS';
export const CREATE_CHAT = 'CREATE_CHAT';
export const OPEN_CHAT = 'OPEN_CHAT';
export const RETRIEVE_CHATS = 'RETRIEVE_CHATS';
export const CLOSE_CHAT = 'CLOSE_CHAT';

export class SendFriendRequest implements Action {
    readonly type = SEND_FRIEND_REQUEST;

    constructor(public payload: User) {}
}

export class GetFriendRequests implements Action {
    readonly type = GET_FRIEND_REQUESTS;

    constructor(public payload: string) {}
}

export class SetFriendRequests implements Action {
    readonly type = SET_FRIEND_REQUESTS;

    constructor(public payload: User[]) {}
}

export class GetFriends implements Action {
    readonly type = GET_FRIENDS;

    constructor(public payload: string) {}
}

export class SetFriends implements Action {
    readonly type = SET_FRIENDS;

    constructor(public payload: any[]) {}
}

export class UpdateSentRequests {
    readonly type = UPDATE_SENT_REQUESTS;

    constructor(public payload: string | string[]) {}
}

export class UpdateFriends implements Action {
    readonly type = UPDATE_FRIENDS;

    constructor(public payload: User) {}
}

export class CreateChat implements Action {
    readonly type = CREATE_CHAT;

    constructor(public payload: string ) {}
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

export type UserActions = SendFriendRequest
    |   GetFriendRequests
    |   SetFriendRequests
    |   GetFriends
    |   SetFriends
    |   UpdateSentRequests
    |   UpdateFriends
    |   CreateChat
    |   OpenChat
    |   RetrieveChats
    |   CloseChat;