import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from '../services/data/auth/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  private roles: string[];
  authority: string;

  constructor(public tokenStorageService: TokenStorageService) { }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.roles = this.tokenStorageService.getAuthorities();
      this.roles.every(role => {
        if (role === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'customer';
        return true;
      });
    }
  }
}
