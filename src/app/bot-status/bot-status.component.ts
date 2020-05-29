import { Component, OnInit, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { BotService, AuthService } from "../_services";
import { faSync, faEye } from '@fortawesome/free-solid-svg-icons';
import { User, Role } from '../_models';


//standard messages errors
const msg = {
  'off': 'The server is right now off. No error Found.',
  'up': 'The server is right now online. No error Found.',
  'err': 'The server is right now off. An error has ocurred.',
  'fix': 'The server is in maintenance.',
}

@Component({
  selector: 'app-bot-status',
  templateUrl: './bot-status.component.html',
  styleUrls: ['./bot-status.component.css']
})
export class BotStatusComponent implements OnInit, OnChanges {
  log = [];
  faSync = faSync;
  faEye = faEye;
  btnStatus: string;
  currentUser: User;
  line:number = 1;

  constructor(
    private bot: BotService,
    private authenticationService: AuthService,
  ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {
    this.setLog(this.bot.getLog());
  }

  /**
   * Execute in case status changes
   */
  ngOnChanges(changes: SimpleChanges) {

  }

  //Reload and reset status attribute.
  reload() {
    window.location.reload();
  }

  setLog(log) {
    log.forEach(k => {
      this.log.push({ k: msg[k] })
    });
  }

  activate() {
    this.swapBotStatus(this.bot.forcedStatus())
  }

  swapBotStatus(status: boolean) {
    status ? this.btnStatus = "On" : this.btnStatus = "Off";
  }

  getStatus() {
    var status = this.bot.getStatus();
    this.swapBotStatus(status);

    this.setLog(this.bot.getLog());
    return status;
  }

  clearConsole(){
    this.log = [];
    this.reload()
  }

  lines(){
    this.line += 1;
    return this.line;
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  date() {
    return Date.now()
  }
}
