import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../services/widget.service.client';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-youtube',
  templateUrl: './widget-youtube.component.html',
  styleUrls: ['./widget-youtube.component.css']
})
export class WidgetYoutubeComponent implements OnInit {

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
