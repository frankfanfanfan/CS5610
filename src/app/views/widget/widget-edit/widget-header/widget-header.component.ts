import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {ActivatedRoute} from '@angular/router';
import {Widget} from '../../../../models/widget.model.client';

@Component({
  selector: 'app-widget-header',
  templateUrl: './widget-header.component.html',
  styleUrls: ['./widget-header.component.css']
})
export class WidgetHeaderComponent implements OnInit {

  userId: String;
  curWidget: Widget;

  constructor(
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute) { }

  updateWidget(widget) {
    this.widgetService.updateWidget(widget);
  }

  deleteWidget(wgid) {
    this.widgetService.deleteWidget(wgid);
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      const preWidget = this.widgetService.findWidgetById(params['wgid']);
      this.curWidget = Object.assign({}, preWidget);
    });
  }

}
