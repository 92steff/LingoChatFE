import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { HomeComponent } from './home/home.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { SignInComponent } from './auth/sign-in/sign-in.component';


const routes: Routes = [
  {path: '', component: HomeComponent, children: [
    {path: '', component: ChatRoomComponent}
  ]},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'sign-in', component: SignInComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
