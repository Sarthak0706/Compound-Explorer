import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSignup() {
    this.authService.signup(this.name, this.email, this.password).subscribe({
      next: (res) => {
        localStorage.setItem('token', res.token);
        this.authService.setUser(res.user);
        alert('Signup successful!');
        this.router.navigate(['/compounds']);
      },
      error: (err) => {
        alert(err.error?.message || 'Signup failed');
      }
    });
  }
}
