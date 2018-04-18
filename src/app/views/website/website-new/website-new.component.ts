import { Component, OnInit } from '@angular/core';
import {Website} from '../../../models/website.model.client';
import {WebsiteService} from '../../../services/website.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

@Component({
  selector: 'app-website-new',
  templateUrl: './website-new.component.html',
  styleUrls: ['./website-new.component.css']
})
export class WebsiteNewComponent implements OnInit {

  userId: String;
  websites: Website[];

  constructor(
    private websiteService: WebsiteService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService) {}

  createWebsite(webName, webDes) {
    const newWebsite = new Website(undefined, webName, '', webDes);
    this.websiteService.createWebsite(this.userId, newWebsite).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.activateRoute});
      });
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.userId = this.sharedService.user._id;
      this.websiteService.findWebsitesByUser(this.userId).subscribe(
        (websites: Website[]) => {
          this.websites = websites;
        }
      );
    });
  }

}
