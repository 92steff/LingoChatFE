import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat-feed',
  templateUrl: './chat-feed.component.html',
  styleUrls: ['./chat-feed.component.less']
})
export class ChatFeedComponent implements OnInit {
  chat = [
     {
      userName: 'Stefan',
      msg: 'This is only a test!'
    },
    {
      userName: 'Me',
      msg: 'I repeat, this is ONLY a test!'
    }
  ]

  constructor() { }

  ngOnInit() {
  }

}
