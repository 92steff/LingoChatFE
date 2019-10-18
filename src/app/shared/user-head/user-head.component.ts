import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-head',
  templateUrl: './user-head.component.html',
  styleUrls: ['./user-head.component.less']
})
export class UserHeadComponent implements OnInit {
  @Input('user') user: User;

  constructor() { }

  ngOnInit() {}

}
