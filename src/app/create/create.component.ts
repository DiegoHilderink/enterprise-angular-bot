import { Component, OnInit } from '@angular/core';
import { AuthService, BotService } from '../_services';
import { Router } from '@angular/router';
import { User, Role } from '../_models';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  currentUser: User;

  constructor(
    private authenticationService: AuthService,
    private bot: BotService,
    private router: Router,
  ) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  get isEmpresa() {
    return this.currentUser && this.currentUser.role === Role.Empresa;
  }
}
