import { Component, OnInit } from '@angular/core';
import {WidgetService} from '../../../../../services/widget.service.client';
import {Widget} from '../../../../../models/widget.model.client';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-new-header',
  templateUrl: './new-header.component.html',
  styleUrls: ['./new-header.component.css']
})
export class NewHeaderComponent implements OnInit {

  pageId;
  constructor(
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  createHeader(text, size) {
    const newHeader = new Widget(undefined, 'HEADING', '', size, text, '', '');
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
