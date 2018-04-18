import { Component, OnInit } from '@angular/core';
import {Page} from '../../../models/page.model.client';
import {PageService} from '../../../services/page.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../services/shared.service';

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
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService) { }

  updatePage(newPage) {
    this.pageService.updatePage(newPage).subscribe(
      (page: Page) => {
        this.curPage = page;
        this.router.navigate(['../'], {relativeTo: this.activateRoute});
      }
    );
  }

  deletePage(pid) {
    this.pageService.deletePage(pid).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.activateRoute});
      }
    );
  }


  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      // this.userId = params['uid'];
      this.websiteId = params['wid'];
      this.pageService.findPageById(params['pid']).subscribe(
        (page: Page) => {
          this.curPage = page;
        });
    });
  }

}
