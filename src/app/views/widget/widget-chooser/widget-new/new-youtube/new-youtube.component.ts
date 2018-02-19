import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../../services/widget.service.client';
import {Widget} from '../../../../../models/widget.model.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-youtube',
  templateUrl: './new-youtube.component.html',
  styleUrls: ['./new-youtube.component.css']
})
export class NewYoutubeComponent implements OnInit {

  pageId;
  constructor(
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute) { }

  createYoutube(text, url, width) {
    const newYoutube = new Widget('', 'YOUTUBE', '', '', text, width, url);
    this.widgetService.createWidget(this.pageId, newYoutube);
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.pageId = params['pid'];
    });
  }

}
