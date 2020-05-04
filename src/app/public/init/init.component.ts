import { Component } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '../../core/models';
import { UserService } from '../../core/shared/services/login';

@Component({ templateUrl: 'init.component.html' })
export class InitComponent {
    loading = false;
    users: User[];

    constructor(private userService: UserService) { }

    ngOnInit() {
        this.loading = true;
        this.userService.getAll().pipe(first()).subscribe(users => {
            this.loading = false;
            this.users = users;
        });
    }
}