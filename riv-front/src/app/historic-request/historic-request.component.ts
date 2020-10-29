import { Component, OnInit } from '@angular/core';
import { UpdatesService } from '../services/updates.service';
import { UserService } from '../services/user.service';
import { Users } from '../models/users';
import { Updates } from '../models/updates';

@Component({
  selector: 'app-historic-request',
  templateUrl: './historic-request.component.html',
  styleUrls: ['./historic-request.component.css']
})
export class HistoricRequestComponent implements OnInit {

  public updatesListColumns: string[] = ['updatedAt','createdAt', 'UserId','title', 'seeMore'];
  private users: Users[] = [];
  public updates: Updates [] = [];

  constructor(private updateService: UpdatesService,
    private userService:UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(_users => {
      this.users = _users;
      this.updateService.getAllEnd().subscribe((_updates: Updates[]) =>{
        console.log(_updates)
        this.updates = _updates;
      })
    });
  }

  getUser(id: number) {
    const user: Users = this.users.find(_user => _user.id === id);
    return user.firstName + ' ' + user.lastName;
  }

}
