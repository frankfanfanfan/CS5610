import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '../../../../../environments/environment';
import {SharedService} from '../../../../services/shared.service';

@Component({
  selector: 'app-widget-image',
  templateUrl: './widget-image.component.html',
  styleUrls: ['./widget-image.component.css']
})
export class WidgetImageComponent implements OnInit {

  userId: String;
  curWidget: Widget;
  webId: String;
  pageId: String;
  wgId: String;
  baseUrl: String;

  constructor(
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private sharedService: SharedService) { }

  updateWidget(newWidget) {
  console.log(newWidget);
    this.widgetService.updateWidget(newWidget).subscribe(
      (widget: Widget) => {
        this.curWidget = widget;
        this.router.navigate(['../'], {relativeTo: this.activateRoute});
      }
    );
  }

  deleteWidget(wgid) {
    this.widgetService.deleteWidget(wgid).subscribe(
      () => {
        this.router.navigate(['../'], {relativeTo: this.activateRoute});
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
      this.widgetService.findWidgetById(params['wgid']).subscribe(
        (widget: Widget) => {
          this.curWidget = widget;
        });
    });
  }

}
