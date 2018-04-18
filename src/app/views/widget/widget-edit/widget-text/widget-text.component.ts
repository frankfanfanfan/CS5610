import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-text',
  templateUrl: './widget-text.component.html',
  styleUrls: ['./widget-text.component.css']
})
export class WidgetTextComponent implements OnInit {

  // userId: String;
  curWidget: Widget;

  constructor(
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  updateWidget(newWidget) {
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
    this.activateRoute.params.subscribe((params: any) => {
      // this.userId = params['uid'];
      this.widgetService.findWidgetById(params['wgid']).subscribe(
        (widget: Widget) => {
          this.curWidget = widget;
        });
    });
  }

}
