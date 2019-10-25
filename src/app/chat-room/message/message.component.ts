import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.less']
})
export class MessageComponent implements OnInit {
  @Input() chatMessage: Message;

  constructor() { }

  ngOnInit() {}

}
