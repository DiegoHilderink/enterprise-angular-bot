import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BotService } from '../_services';
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
          <td><button class="btn btn-danger" id="user-${k['id']}">x</button></td>
        </tr>
        `)

      $('#user-' + k['id']).click(() => {
        this.deleteLine(k['id']);
      })
    });
  }

  deleteLine(id) {
    var user = this.findUser(id, 'delete')
    user['function'] = 'delete';
    delete this.users[this.users.indexOf(user)]
    this.genList(this.users)
  }

  findUser(data, method = null) {
    this.last = [];
    var user;
    this.users.forEach(k => {
      if (
        k['id'] === parseInt(data) ||
        k['name'].includes(data) ||
        k['number'] === parseInt(data) ||
        k['country'] === data
      ) {

        method !== null ? user = k : this.last.push(k)
      }
    });

    if (method != null) {
      return user;
    }

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