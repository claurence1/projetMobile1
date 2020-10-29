import {ErrorHandler, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';

@Injectable({
  providedIn: 'root',
})
export class UserService implements ErrorHandler {

  private server = 'http://localhost:3000/';
  constructor(private http: HttpClient) {

  }

  handleError(error) {
    console.log(error);
  }

  public getAllUsers() {
    return this.http.get<Users[]>(this.server + 'users/').pipe(_users => _users);
  }

  public createUser(users) {
    return this.http.post(this.server + 'users/', users);
  }

  public deleteUser(userId) {
    return this.http.delete(`${this.server}users/${userId}`);
  }

  public updateOneUser(user: Users) {
    console.log(user);
    return this.http.put(`${this.server}users/${user.id}`, user);
  }
}
