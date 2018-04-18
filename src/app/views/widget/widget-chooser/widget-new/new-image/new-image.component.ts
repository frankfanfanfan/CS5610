import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../../services/widget.service.client';
import {Widget} from '../../../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../../environments/environment';
import {SharedService} from '../../../../../services/shared.service';

@Component({
  selector: 'app-new-image',
  templateUrl: './new-image.component.html',
  styleUrls: ['./new-image.component.css']
})
export class NewImageComponent implements OnInit {

  pageId;
  userId: String;
  webId: String;
  wgId: String;
  baseUrl: String;

  constructor(
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService) { }

  createImage(text, url, width) {
    const newImage = new Widget(undefined, 'IMAGE', '', 1, text, width, url);
    this.widgetService.createWidget(this.pageId, newImage).subscribe(
      () => {
        this.router.navigate(['../..'], {relativeTo: this.activateRoute});
      }
    );
  }

  ngOnInit() {
    this.baseUrl = environment.baseUrl;
    this.activateRoute.params.subscribe((params: any) => {
      this.userId = this.sharedService.user._id;
      this.webId = params['wid'];
      this.pageId = params['pid'];
      this.wgId = params['wgid'];
    });
  }
}
