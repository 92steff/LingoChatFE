import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-head',
  templateUrl: './user-head.component.html',
  styleUrls: ['./user-head.component.less']
})
export class UserHeadComponent implements OnInit {
  @Input('user') user: Object;

  constructor() { }

  ngOnInit() {
  }

}
