import {Component, OnInit, ViewChild} from '@angular/core';
import { Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {NgForm} from '@angular/forms';
import {SharedService} from '../../../services/shared.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild('f') loginForm: NgForm;
  username: String; // see usage as two-way data binding
  password: String; // see usage as two-way data binding

  constructor(
    private userService: UserService,
    private router: Router,
    private sharedService: SharedService) { }

  // login() {
  //   this.username = this.loginForm.value.username;
  //   this.password = this.loginForm.value.password;
  //   // alert(this.username);
  //
  //   const user: User = this.userService.findUserByCredential(this.username, this.password);
  //   if (user) {
  //     this.router.navigate(['/user', user._id]);
  //   } else {
  //     alert(this.errorMsg);
  //   }
  // }

  login() {
    this.username = this.loginForm.value.username;
    this.password = this.loginForm.value.password;

    // this.userService.findUserByCredential(this.username, this.password)
    //   .subscribe((user: User) => {
    //     if (user) {
    //       console.log(user);
    //       this.router.navigate(['/user', user._id ]);
    //     }
    //   });
    this.userService.login(this.username, this.password)
      .subscribe(
        (data: any) => {
          console.log(this.username);
          this.sharedService.user = data;
          this.router.navigate(['/user']);
          }, (error: any) => {
          console.log(error);
        });
  }

  ngOnInit() {
  }

}
