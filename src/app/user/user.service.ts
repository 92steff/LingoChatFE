import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(environment.apiEndpoint + 'users');
  }

  getFriends(uid) {
    return this.http.get(environment.apiEndpoint + 'users/' + uid + '/friends');
  }

}
