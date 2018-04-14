import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../../services/widget.service.client';
import {Widget} from '../../../../../models/widget.model.client';

@Component({
  selector: 'app-new-html',
  templateUrl: './new-html.component.html',
  styleUrls: ['./new-html.component.css']
})
export class NewHtmlComponent implements OnInit {

  pageId;
  constructor(
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  createHtml(name, text) {
    const newHeader = new Widget(undefined, 'HTML', '', 1, text, '', '', name);
    this.widgetService.createWidget(this.pageId, newHeader).subscribe(
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
