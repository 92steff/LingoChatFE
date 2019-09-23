import { Component, OnInit } from '@angular/core';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.less']
})
export class ChatFormComponent implements OnInit {
  faPaperPlane = faPaperPlane;

  constructor() { }

  ngOnInit() {
  }

}
