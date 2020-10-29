import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../services/navbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board-administration',
  templateUrl: './board-administration.component.html',
  styleUrls: ['./board-administration.component.css']
})
export class BoardAdministrationComponent implements OnInit {

  public item: string = 'users';
  constructor(private nav: NavbarService, private route: Router) {

  }

  ngOnInit() {
    this.nav.context = 'Administration';
    this.setItem();

  }

  setItem() {
    setTimeout(() => {
      let url:  string[] = this.route.url.split('/');
      url = url.reverse()
      this.item = url[0]
      console.log(this.item)
      if (this.item === 'administration') {
        this.item = 'users'
        this.route.navigate(['/administration/users'])
      }
    },50);

  }

}
