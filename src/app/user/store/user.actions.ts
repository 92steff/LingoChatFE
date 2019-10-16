import { Action } from '@ngrx/store';
import { User } from '../../models/user.model';
import { Chat } from 'src/app/models/chat.model';
import { Message } from '../../models/message.model';
import { ChatData } from 'src/app/models/chatData.model';

export const GET_USER = 'GET_USER';
export const SET_USER_INFO = 'SET_USER_INFO';
export const SEND_FRIEND_REQUEST = 'SEND_FRIEND_REQUEST';
export const GET_FRIEND_REQUESTS = 'GET_FRIEND_REQUESTS';
export const SET_FRIEND_REQUESTS = 'SET_FRIEND_REQUESTS';
export const REMOVE_FRIEND_REQUEST = 'REMOVE_FRIEND_REQUEST';
export const ACCEPT_FRIEND_REQUEST = 'ACCEPT_FRIEND_REQUEST';
export const GET_FRIENDS = 'GET_FRIENDS';
export const SET_FRIENDS = 'SET_FRIENDS';
export const UPDATE_SENT_REQUESTS = 'UPDATE_SENT_REQUESTS';
export const UPDATE_FRIENDS = 'UPDATE_FRIENDS';
export const GET_CHATS = 'GET_CHATS';
export const GET_CHAT = 'GET_CHAT';
export const UPDATE_CHAT = 'UPDATE_CHAT';
export const SET_CHATS = 'SET_CHATS';
export const CREATE_CHAT = 'CREATE_CHAT';
export const OPEN_CHAT = 'OPEN_CHAT';
export const RETRIEVE_CHATS = 'RETRIEVE_CHATS';
export const CLOSE_CHAT = 'CLOSE_CHAT';
export const GET_MESSAGES = 'GET_MESSAGES';
export const POST_MESSAGE = 'POST_MESSAGE';

export class GetUser implements Action {
    readonly type = GET_USER;

    constructor(public payload: string) {}
}

export class SetUserInfo implements Action {
    readonly type = SET_USER_INFO;

    constructor(public payload: User) {}
}

export class SendFriendRequest implements Action {
    readonly type = SEND_FRIEND_REQUEST;

    constructor(public payload: User) {}
}

export class GetFriendRequests implements Action {
    readonly type = GET_FRIEND_REQUESTS;
}

export class SetFriendRequests implements Action {
    readonly type = SET_FRIEND_REQUESTS;

    constructor(public payload: User[]) {}
}

export class RemoveFriendRequest implements Action {
    readonly type = REMOVE_FRIEND_REQUEST;

    constructor(public payload: string) {}
}

export class AcceptFriendRequest implements Action {
    readonly type = ACCEPT_FRIEND_REQUEST;

    constructor(public payload: User) {}
}

export class GetFriends implements Action {
    readonly type = GET_FRIENDS;
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

export class GetChats implements Action {
    readonly type = GET_CHATS;
}

export class SetChats implements Action {
    readonly type = SET_CHATS;

    constructor(public payload: Chat[]) {}
}

export class GetChat implements Action {
    readonly type = GET_CHAT;

    constructor(public payload: Chat) {}
}

export class CreateChat implements Action {
    readonly type = CREATE_CHAT;

    constructor(public payload: User ) {}
}

export class UpdateChat implements Action {
    readonly type = UPDATE_CHAT;

    constructor(public payload: Chat) {}
}

export class OpenChat implements Action {
    readonly type = OPEN_CHAT;

    constructor(public payload: ChatData) {}
}

export class RetrieveChats implements Action {
    readonly type = RETRIEVE_CHATS;

    constructor(public payload: ChatData[]) {}
}

export class CloseChat implements Action {
    readonly type = CLOSE_CHAT;

    constructor(public payload: string) {}
}

export class GetMessages implements Action {
    readonly type = GET_MESSAGES;
}

export class PostMessage implements Action {
    readonly type = POST_MESSAGE;

    constructor(public payload: Message) {}
}

export type UserActions = GetUser
    |   SetUserInfo
    |   SendFriendRequest
    |   GetFriendRequests
    |   SetFriendRequests
    |   RemoveFriendRequest
    |   AcceptFriendRequest
    |   GetFriends
    |   SetFriends
    |   UpdateSentRequests
    |   UpdateFriends
    |   GetChats
    |   SetChats
    |   GetChat
    |   CreateChat
    |   UpdateChat
    |   OpenChat
    |   RetrieveChats
    |   CloseChat
    |   GetMessages
    |   PostMessage;