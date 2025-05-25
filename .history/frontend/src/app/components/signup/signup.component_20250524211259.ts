import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  onSignup() {
    // TODO: Implement signup logic
    console.log('Signup:', this.name, this.email, this.password);
  }
}
