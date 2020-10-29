import {OnInit, Component, Output, EventEmitter, Input, OnChanges} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Users } from '../models/users';
import { UserService } from '../services/user.service';
import { UsertypesService } from '../services/usertypes.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ErreurDialogComponent } from '../erreur-dialog/erreur-dialog.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})

// Controller du composant de création d'une utilisateur
export class UserCreateComponent implements OnInit, OnChanges {
  private isCreated: boolean;
  private user: Users;
  private userId: string;
  public userForm: FormGroup;
  title = 'Ajouter un utilisateur';
  public userTypes: any = [];
  dataSource = this.userTypes;

  @Output() afterCreate = new EventEmitter<string>();
  @Input() _updateUser: Users;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private dialog: MatDialog,
    private usertypesService: UsertypesService,
    private route: ActivatedRoute) {
    this.usertypesService.getAllUserType().subscribe(_userTypes => {
      this.userTypes = _userTypes;
      console.log(this.userTypes);
    });
   }

  /*
    Permet d'initialiser le formulaire de création d'un utilisateur
  */
  ngOnInit() {
    this.createForm();
    // get my user id.
    this.userId = this.route.snapshot.paramMap.get('id');
    console.log(this.userId);
    // get my user with the id
    this.isCreated = true;
  }

  ngOnChanges(): void {
    if(this._updateUser !== undefined) {
      this.isCreated = false;
      console.log(this._updateUser);
      this.user = this._updateUser;
      this.insertData(this.user);
    }
  }

  insertData(user: Users) {
    this.userForm.get('general').patchValue(user);
  }

  /*
    Traitement à l'envoi du formulaire depuis l'interface, permet de vérifier la correspondance des deux mots de passe
  */
  ngOnSubmit() {
    console.log(this.userForm.get('pwd').get('password').value);
    this.isCreated === false ? this.updateUser(this.user) : this.createUser();
  }

  createUser() {
    if (this.userForm.get('pwd').get('password').value === this.userForm.get('pwd').get('confirmPassword').value) {
      const user: Users = new Users(
        this.userForm.get('general').get('mail').value,
        this.userForm.get('pwd').get('password').value,
        this.userForm.get('general').get('UserTypeId').value,
        this.userForm.get('general').get('firstName').value,
        this.userForm.get('general').get('lastName').value);
      this.userService.createUser(user).subscribe(_value => {
        console.log(_value);
        this.resetUserForm();
        this.afterCreate.emit('refresh');
      });
    } else {
      this.openDialog();
    }
  }

  updateUser(userToUpdate: Users) {
   userToUpdate.mail = this.userForm.get('general').get('mail').value;
   userToUpdate.UserTypeId = this.userForm.get('general').get('UserTypeId').value;
   userToUpdate.firstName = this.userForm.get('general').get('firstName').value;
   userToUpdate.lastName = this.userForm.get('general').get('lastName').value;
   this.userService.updateOneUser(userToUpdate).subscribe(_userUpdated => {
      console.log(_userUpdated);
      this.isCreated = true;
      this.resetUserForm();
      // this.user = _userUpdated;
    }, err => console.log('Error: ', err));
  }

  /*
    Permet de reset le formulaire
  */
  resetUserForm() {
    this.isCreated === false ? this.insertData(this.user) : this.userForm.reset();
  }

  /*
    Permet d'ouvrir une boite de dialogue contenant un message d'erreur
  */
  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      text: 'Les mots de passe ne correspondent pas',
      title: 'Dialog erreur'
    };

    this.dialog.open(ErreurDialogComponent, dialogConfig);
  }

  createForm() {
    this.userForm = this.fb.group({  // Crée une instance de FormGroup
      general: this.fb.group({
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        mail: ['', Validators.required],
        UserTypeId: ['', Validators.required],
      }),
      pwd: this.fb.group({
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      })
    });
  }

}
