import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  user: any = null;

  constructor(public authService: AuthService, private router: Router) {
    this.user = this.authService.getUser();
  }

  ngDoCheck() {
    // Keep user info in sync with localStorage
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/login']);
  }
}
