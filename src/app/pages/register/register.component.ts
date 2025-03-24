import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMessage = '';
  successMessage = '';

  constructor(private auth: AuthService, private router: Router) {}

  onSubmit() {
    const success = this.auth.register(this.username, this.password);
    if (success) {
      this.successMessage = 'Usuario registrado con éxito. Redirigiendo a login...';
      setTimeout(() => this.router.navigate(['/login']), 2000);
    } else {
      this.errorMessage = 'Este usuario ya existe.';
    }
  }
}
