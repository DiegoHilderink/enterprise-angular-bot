import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BotService } from '../../core/shared/services/bot/bot.service'
declare var $: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users = [];
  scopeTable;
  last = []
  profileForm: FormGroup;
  constructor(private bot: BotService) { }

  ngOnInit(): void {
    this.scopeTable = $('#user-table');
    this.profileForm = new FormGroup({
      'user': new FormControl(null)
    });

    this.setList();
    this.genList(this.users);
  }

  setList() {
    this.users = this.bot.getUsers();
  }

  genList(list) {
    this.cleanTable()
    list.forEach(k => {
      this.scopeTable.append(`
        <tr>
          <th scope="row">${k['id']}</th>
          <td>${k['name']}</td>
          <td>${k['number']}</td>
          <td>${k['country']}</td>
        </tr>
        `)
    });
  }

  findUser(data) {
    this.last = [];
    this.users.forEach(k => {
        if(
          k['id'] === parseInt(data) || 
          k['name'].includes(data) || 
          k['number'] === parseInt(data) ||
          k['country'] === data
        ) {
          
          this.last.push(k);
        }
    });

    this.genList(this.last);
  }

  onSubmit() {
    this.cleanTable();
    this.findUser(this.profileForm.value['user']);
  }

  cleanTable() {
    this.scopeTable.empty();
  }
}
