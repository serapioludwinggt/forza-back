import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private users: { [key: string]: string } = {}; // Simulación de almacenamiento

  login(username: string, password: string): boolean {
    if (this.users[username] === password) {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  register(username: string, password: string): boolean {
    if (this.users[username]) return false; // Ya existe
    this.users[username] = password;
    return true;
  }

  logout() {
    this.loggedIn = false;
  }

  isAuthenticated(): boolean {
    return this.loggedIn;
  }
}
