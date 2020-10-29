import { Component, OnInit } from '@angular/core';
import {Users} from '../models/users';
import { UserService } from '../services/user.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import { WarningDialogComponent } from '../warning-dialog/warning-dialog.component';
import {UsertypesService} from '../services/usertypes.service';
import {UserTypes} from '../models/userTypes';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})


export class UsersListComponent implements OnInit {

  public users: any = [];
  public usersType: UserTypes[] = [];
  public userToUpdate: Users;
  usersListColumns: string[] = ['firstName', 'lastName', 'mail', 'UserTypeId', 'deleteUser', 'updateUser'];

  constructor(
    private userService: UserService, 
    public dialog: MatDialog,
    private userTypeService: UsertypesService,) {
    this.userTypeService.getAllUserType().subscribe(_usersType => {
      this.usersType = _usersType;
      this.userService.getAllUsers().subscribe(_users => {
        this.users = _users;
      });
    });
  }

  ngOnInit() {
  }

  refresh() {
    this.userService.getAllUsers().subscribe(_users => {
      this.users = _users;
    });
  }

  deleteUser(user: Users) {
  const dialogConfig: MatDialogConfig = new MatDialogConfig();
  dialogConfig.disableClose = true;
  dialogConfig.data = {
    title: 'Avertissement',
    text: 'Êtes-vous sûr de supprimer cet utilisateur ?'
  };
  const dialogRef = this.dialog.open(WarningDialogComponent, dialogConfig);
  dialogRef.afterClosed().subscribe(result => {
    if (result === 'OK') {
        this.userService.deleteUser(user).subscribe(_delete => {
          // _delete = objet que l'on supprime
        // ramener tous les users
        this.userService.getAllUsers().subscribe(_users => {
          this.users = _users;
        });
      });
    }
  });
}

  goToUpdateUser(user: Users) {
    this.userToUpdate = user;
  }

  getRoleName(id: number) {
    if (id && this.usersType !== []) {
      return this.usersType.find(element => element.id === id).libelle;
    }
    return;
  }
}
