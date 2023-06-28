import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username!: string;
  password!: string;

  constructor(private router: Router) { }

  onSubmit() {
    // Implement authentication logic
    if (this.username == 'admin' && this.password == 'patrick123') {
      this.router.navigate(['/dashboard']);
    } else {
      alert('Invalid username or password');
    }
  }
}