import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCog } from '@fortawesome/free-solid-svg-icons';

import { AuthService } from './_services';
import { User, Role } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rentel-bot';
  faCog = faCog;
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isEmpresa() {
    return this.currentUser && this.currentUser.role === Role.Empresa;
  }
  
  get isEmpleado() {
    return this.currentUser && this.currentUser.role === Role.Empleado;
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
