import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers } from './store/app.reducers';

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
import { UserHeadComponent } from './chat-room/user-head/user-head.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthEffects } from './auth/store/auth.effects';
import { ToastService } from './services/toast.service';
import { AuthService } from './services/auth.service';
import { AuthGuardService } from './auth/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';

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
    MessageComponent,
    UserHeadComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([AuthEffects]),
    NgbModule,
    JwtModule.forRoot({
      config: {
        // tokenGetter: () => AuthService.l
      }
    })
  ],
  providers: [
    ToastService,
    AuthService,
    AuthGuardService,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
