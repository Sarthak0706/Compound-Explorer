import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router, private snackBar: MatSnackBar) {}

  onSignup() {
    this.authService.signup(this.name, this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.authService.setUser(res.user);
        this.snackBar.open('Signup successful!', 'Close', { duration: 3000, panelClass: 'snackbar-success' });
        this.router.navigate(['/compounds']);
      },
      error: (err) => {
        this.snackBar.open(err.error?.message || 'Signup failed', 'Close', { duration: 3000, panelClass: 'snackbar-error' });
      }
    });
  }
}
