
import { Injectable } from '@angular/core';
import bot from '../../assets/bot.json';

@Injectable({
    providedIn: 'root'
})
export class BotService {
    blocked;
    conf;
    users;
    status : boolean;
    log;
    prob = 5;

    constructor() {
        this.blocked = bot['blocked'];
        this.conf = bot['bot'];
        this.users = bot['users'];
        this.status = bot['status']['status'];
        this.log = bot['status']['log'];
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

    getLog(){
        return this.log;
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