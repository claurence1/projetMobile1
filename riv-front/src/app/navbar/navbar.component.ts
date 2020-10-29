import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UpdatesService } from '../services/updates.service';
import { Updates } from '../models/updates';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public context: string;
  constructor(public nav: NavbarService,
    private router: Router,
    private authService: AuthService,
    ) {
    }

  ngOnInit() {
    this.nav.updateDemandeValidation();
    this.nav.updateCurrentUser();
  }



  signOut() {
    this.nav.hide();
    this.router.navigate(['/login']);
    this.authService.logout();
  }

  

}

