import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Users } from '../models/users';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private server = 'http://localhost:3000/';

  private users: Users[] = [];
  private currentUserSubject: BehaviorSubject<Users>;
  public currentUser: Observable<Users>;

  constructor(private userService: UserService, private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<Users>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.userService.getAllUsers().subscribe(_users => {
      this.users = _users;
    });

  }

  public get currentUserValue(): Users {
    return this.currentUserSubject.value;
  }

  public authenticate(mail: string, password: string) {
    const user = this.users.find(element => element.mail === mail && element.password === password);
    if (user) {
      user.token = 'fake-jwt-token';
      return user;
    } else {
      return;
    }

  }

  login(mail: string, password: string) {
    return this.http.post<any>(this.server + 'users/authenticate', { mail, password })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        if(user !== null) {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
