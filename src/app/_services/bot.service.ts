
import { Injectable } from '@angular/core';
import bot from '../../assets/bot.json';

@Injectable({
    providedIn: 'root'
})
export class BotService {
    blocked;
    conf;
    users;
    status;
    prob = 5;

    constructor() {
        this.blocked = bot['blocked'];
        this.conf = bot['bot'];
        this.users = bot['users'];
        this.status = bot['status'];
    }

    getBlocked() {
        return this.blocked;
    }

    getUsers() {
        return this.users;
    }

    addNumber(number) {
        this.blocked.push(number);
    }

    getStatus() {
        this.setStatus();
        return this.status;
    }

    setStatus() {
        var a = Math.floor(Math.random() * (100 - 0)) + 0;
        if (a > this.prob) {
            this.prob += 5
        } else {
            this.status = !this.status;
            this.prob = 5;
        };
    }
}