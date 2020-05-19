import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { faCog, faBullseye } from '@fortawesome/free-solid-svg-icons';

import { AuthService, BotService } from './_services';
import { User, Role } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'rentel-bot';
  faCog = faCog;
  faBullseye = faBullseye;
  currentUser: User;

  constructor(
    private router: Router,
    private authenticationService: AuthService,
    private bot: BotService
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

  get isUser() {
    return this.currentUser && this.currentUser.role === Role.User;
  }
  
  getStatus() {
    return this.bot.getStatus()
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
