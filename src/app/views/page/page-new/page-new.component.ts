import { Component, OnInit } from '@angular/core';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';
import {Page} from '../../../models/page.model.client';

@Component({
  selector: 'app-page-new',
  templateUrl: './page-new.component.html',
  styleUrls: ['./page-new.component.css']
})
export class PageNewComponent implements OnInit {

  userId: String;
  websiteId: String;

  constructor(
    private pageService: PageService,
    private activateRoute: ActivatedRoute) { }

  createPage(pageName, pageTitle) {
    const newPage = new Page('', pageName, '', pageTitle);
    this.pageService.createPage(this.websiteId, newPage);
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
    });
  }

}
