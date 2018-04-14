import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../../services/widget.service.client';
import {Widget} from '../../../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-new-youtube',
  templateUrl: './new-youtube.component.html',
  styleUrls: ['./new-youtube.component.css']
})
export class NewYoutubeComponent implements OnInit {

  pageId;
  constructor(
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  createYoutube(text, url, width) {
    const newYoutube = new Widget(undefined, 'YOUTUBE', '', 1, text, width, url);
    this.widgetService.createWidget(this.pageId, newYoutube).subscribe(
      () => {
        this.router.navigate(['../..'], {relativeTo: this.activateRoute});
      }
    );
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.pageId = params['pid'];
    });
  }

}
