import { Component, OnInit } from '@angular/core';
import {WebsiteService} from '../../../services/website.service.client';
import {Website} from '../../../models/website.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-edit',
  templateUrl: './website-edit.component.html',
  styleUrls: ['./website-edit.component.css']
})
export class WebsiteEditComponent implements OnInit {

  userId: String;
  curWebsite: Website;
  websites: Website[];

  constructor(
    private websiteService: WebsiteService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService
  ) { }

  updateWebsite(newWebsite) {
    this.websiteService.updateWebsite(newWebsite).subscribe(
      (website: Website) => {
        this.curWebsite = website;
        this.router.navigate(['../'], {relativeTo: this.activateRoute});
      }
    );
  }

  deleteWebsite(wid) {
    this.websiteService.deleteWebsite(wid).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.activateRoute});
      }
    );
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      // this.userId = params['uid'];
      this.userId = this.sharedService.user._id;
      // const preWebsite = this.websiteService.findWebsitesById(params['wid'])
      //   .subscribe((website: Website) => {
      //     this.curWebsite = website;
      //   });
      // this.curWebsite = Object.assign({}, preWebsite);
      this.websiteService.findWebsitesById(params['wid'])
        .subscribe((website: Website) => {
          this.curWebsite = website;
        });
      this.websiteService.findWebsitesByUser(this.userId)
        .subscribe((websites: Website[]) => {
          this.websites = websites;
        });
    });
  }

}
