import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService) {}

  createUser(username, pass, passVal) {
    if (passVal === pass) {
      const newUser = new User('', username, pass);
      this.userService.createUser(newUser);
    } else {
      alert('Password not match');
    }

  }

  ngOnInit() {
  }

}
