
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
        this.blocked.unshift(number);
    }

    getLog(){
        return this.log;
    }

    getStatus() {
        this.setStatus();
        return this.status;
    }

    setStatus() {
        var aux = this.status;
        var opc = {1:'off', 2:'err', 3:'fix'};
        var a = Math.floor(Math.random() * (100 - 0)) + 0;
        if (a > this.prob) {
            this.prob += 5
        } else {
            aux = !this.status;
            this.prob = 5;
        };

        if (aux != this.status) {
            this.status = !this.status;
            if (this.status === false){
                var b = Math.floor(Math.random() * (3 - 1)) + 1;
                this.log.unshift(opc[b]);
            } else {
                this.log.unshift('up');
            }
            console.log(this.log)
        }

    }

    forcedStatus() {
        this.status = !this.status;
        this.prob = 5;
        return this.status;
    }
}