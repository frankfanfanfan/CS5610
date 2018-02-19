import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../models/widget.model.client';
import {WidgetService} from '../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-widget-list',
  templateUrl: './widget-list.component.html',
  styleUrls: ['./widget-list.component.css']
})
export class WidgetListComponent implements OnInit {

  userId: String;
  pageId: String;
  webId: String;
  widgets: Widget[];

  constructor(
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute,
    private sanitizer: DomSanitizer) { }

  getUrl(url: String) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url.toString().replace('watch?v=', 'embed/'));
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.webId = params['wid'];
      this.pageId = params['pid'];
      this.widgets = this.widgetService.findWidgetsByPageId(this.pageId);
    });
  }

}
