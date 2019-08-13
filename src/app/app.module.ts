import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { FriendListComponent } from './chat-room/friend-list/friend-list.component';
import { HeaderComponent } from './header/header.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { ChatUnitComponent } from './chat-room/chat-unit/chat-unit.component';
import { ChatFeedComponent } from './chat-room/chat-feed/chat-feed.component';
import { ChatFormComponent } from './chat-room/chat-form/chat-form.component';
import { MessageComponent } from './chat-room/message/message.component';


@NgModule({
  declarations: [
    AppComponent,
    SignUpComponent,
    HomeComponent,
    FriendListComponent,
    HeaderComponent,
    ChatRoomComponent,
    ChatUnitComponent,
    ChatFeedComponent,
    ChatFormComponent,
    MessageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
