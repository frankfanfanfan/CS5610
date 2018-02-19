import {Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  username: String; // see usage as two-way data binding
  password: String; // see usage as two-way data binding
  errorFlag: boolean;
  errorMsg = 'Invalid username or password !';

  constructor(
    private userService: UserService,
    private router: Router) { }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;
    // alert(this.username);

    const user: User = this.userService.findUserByCredential(this.username, this.password);
    if (user) {
      this.router.navigate(['/user', user._id]);
    } else {
      alert(this.errorMsg);
    }
  }

  ngOnInit() {
  }

}