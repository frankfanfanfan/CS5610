import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../../services/user.service.client';
import {User} from '../../../models/user.model.client';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService) { }

  updateUser(changed_user) {
    this.route.params.subscribe(params => {
      return this.userService.updateUser(changed_user).subscribe(
        () => {
          console.log(changed_user);
        }
        // (user: User) => {
        //   this.user = user;
        // }
      );
    });
  }

  logout() {
    this.userService.logout()
      .subscribe(
        (data: any) => this.router.navigate(['/login'])
      );
  }

  ngOnInit() {
    // this.route.params.subscribe(params => {
    //   this.userService.findUserById(params['uid'])
    //     .subscribe((user: User) => {
    //       this.user = user;
    //       console.log(user);
    //     });
    // });
    this.user = this.sharedService.user;
  }

}
