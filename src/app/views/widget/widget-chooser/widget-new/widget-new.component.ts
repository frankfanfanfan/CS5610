import { Component, OnInit } from '@angular/core';
import {Widget} from '../../../../models/widget.model.client';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-widget-new',
  templateUrl: './widget-new.component.html',
  styleUrls: ['./widget-new.component.css']
})
export class WidgetNewComponent implements OnInit {
  userId: String;
  wgType: String;
  constructor(private activateRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activateRoute.params.subscribe((params: any) => {
      this.userId = params['uid'];
      this.wgType = params['wtype'];
    });
  }

}
