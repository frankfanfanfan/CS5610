import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router) {}

  createUser(username, pass, passVal) {
    if (passVal === pass) {
      const newUser = new User(undefined, username, pass);
      // this.userService.createUser(newUser);
      this.userService.createUser(newUser).subscribe(
        (user: User) => {
          console.log(username);
        }
      );
    } else {
      alert('Password not match');
    }
  }

  register(username, pass, passVal) {
    if (passVal === pass) {
      const newUser = new User(undefined, username, pass);
      this.userService.register(username, pass).subscribe(
        (user: User) => {
          this.router.navigate(['/user']);
        }
      );
    } else {
      alert('Password not match');
    }
  }

  ngOnInit() {
  }

}
