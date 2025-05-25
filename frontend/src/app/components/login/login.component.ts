import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.authService.setUser(res.user);
        this.snackBar.open('Login successful!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
        this.router.navigate(['/compounds']);
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Login failed', 'Close', { duration: 3000, panelClass: 'snackbar-error' });
      }
    });
  }
}
