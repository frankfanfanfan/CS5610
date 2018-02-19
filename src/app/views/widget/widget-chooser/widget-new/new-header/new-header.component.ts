import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../../services/widget.service.client';
import {Widget} from '../../../../../models/widget.model.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-new-header',
  templateUrl: './new-header.component.html',
  styleUrls: ['./new-header.component.css']
})
export class NewHeaderComponent implements OnInit {

  pageId;
  constructor(
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute) { }

  createHeader(text, size) {
    const newHeader = new Widget('', 'HEADER', '', size, text, '', '');
    this.widgetService.createWidget(this.pageId, newHeader);
  }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.pageId = params['pid'];
    });
  }

}
