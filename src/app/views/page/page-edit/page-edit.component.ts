import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-edit',
  templateUrl: './page-edit.component.html',
  styleUrls: ['./page-edit.component.css']
})
export class PageEditComponent implements OnInit {
  userId: String;
  websiteId: String;
  curPage: Page;

  constructor(
    private pageService: PageService,
    private activateRoute: ActivatedRoute) { }

  updatePage(page) {
    this.pageService.updatePage(page);
  }

  deletePage(pid) {
    this.pageService.deletePage(pid);
  }


  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.websiteId = params['wid'];
      const prePage = this.pageService.findPageById(params['pid']);
      this.curPage = Object.assign({}, prePage);
    });
  }

}
