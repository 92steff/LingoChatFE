import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { UserHeadComponent } from './shared/user-head/user-head.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';
import { AuthEffects } from './auth/store/auth.effects';
import { ToastService } from './services/toast.service';
import { AuthService } from './auth/auth.service';
import { AuthGuardService } from './auth/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { UserService } from './user/user.service';
import { FilterPipe } from './pipes/filter.pipe';
import { UserEffects } from './user/store/user.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NgxUiLoaderModule, NgxUiLoaderConfig, SPINNER } from  'ngx-ui-loader';
import { UserProfileComponent } from './user/user-profile/user-profile.component';

export function getToken():string {
    let cookieS:CookieService;
    const data = cookieS.get('userData');
    return data['token'];
}

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  fgsType: SPINNER.ballSpinClockwise,
  fgsSize: 35,
  fgsColor: '#333',
  hasProgressBar: false
};

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
    SignInComponent,
    FilterPipe,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    EffectsModule.forRoot([AuthEffects, UserEffects]),
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ["https://lingo-chat-vapor.herokuapp.com/"]
      }
    }),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig)
  ],
  providers: [
    ToastService,
    AuthService,
    AuthGuardService,
    CookieService,
    UserService
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
  bootstrap: [AppComponent]
})
export class AppModule { }
