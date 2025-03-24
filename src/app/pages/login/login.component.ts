// login.component.ts
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from '../../shared/navbar/navbar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  imports: [
    CommonModule,
    NavbarComponent,
    FormsModule,
    RouterModule,
  ],
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    if (this.auth.login(this.username, this.password)) {
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Credenciales incorrectas';
    }
  }
}
