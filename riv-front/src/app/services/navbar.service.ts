import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Users } from '../models/users';
import { UpdatesService } from './updates.service';
import { Updates } from '../models/updates';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  visible: boolean;
  currentUser: Users;
  context: string;
  nbUpdate: number;
  constructor(private authService: AuthService, private updateService: UpdatesService) {
    
    if (this.authService.currentUserValue) {
      this.visible = true;
      this.updateCurrentUser();
    } else {
      this.visible = false;
    }
  }

  hide() { this.visible = false; }

  show() { this.visible = true; }

  updateCurrentUser() { this.currentUser = this.authService.currentUserValue; }

  toggle() { this.visible = !this.visible; }

  updateDemandeValidation() {
    this.updateService.getAllInProgress().subscribe((_updates: Updates[]) => {
      this.nbUpdate = _updates.length
    });
  }
}
