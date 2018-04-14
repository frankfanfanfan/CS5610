import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {WidgetService} from '../../../../../services/widget.service.client';
import {Widget} from '../../../../../models/widget.model.client';

@Component({
  selector: 'app-new-text',
  templateUrl: './new-text.component.html',
  styleUrls: ['./new-text.component.css']
})
export class NewTextComponent implements OnInit {

  pageId;
  constructor(
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  createHtml(name, text, rows, holder, formatted) {
    const newHeader = new Widget(undefined, 'TEXT', '', 1, text, '', '', name, rows, holder, formatted);
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
