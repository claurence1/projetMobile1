import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserTypes} from '../models/userTypes';

@Injectable({
  providedIn: 'root'
})
export class UsertypesService {

  private server = 'http://localhost:3000/';
  constructor(private http: HttpClient) {

  }

  public getAllUserType() {
    return this.http.get<UserTypes[]>(`${this.server}userTypes/`).pipe(_userTypes => { return _userTypes });
  }
}
