import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { faCog, faBullseye } from '@fortawesome/free-solid-svg-icons';


import { User } from '../_models';
import { UserService, BotService } from '../_services';

@Component({ templateUrl: 'admin.component.html' })
export class AdminComponent implements OnInit {
    loading = false;
    users: User[] = [];
    faBull = faBullseye;
    faCog = faCog;

    constructor(private userService: UserService, private bot: BotService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }

    getStatus() {
        return this.bot.getStatus();
    }
}