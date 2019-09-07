import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-chat-unit',
  templateUrl: './chat-unit.component.html',
  styleUrls: ['./chat-unit.component.less']
})
export class ChatUnitComponent implements OnInit {
  @Input('userData') userData: User;

  constructor() { }

  ngOnInit() {
  }

}
