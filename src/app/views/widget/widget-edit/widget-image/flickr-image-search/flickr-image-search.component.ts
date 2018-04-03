import { Component, OnInit } from '@angular/core';
import {FlickrService} from '../../../../../services/flickr.service.client';
import {WidgetService} from '../../../../../services/widget.service.client';
import {ActivatedRoute, Router} from '@angular/router';
import {Widget} from '../../../../../models/widget.model.client';

@Component({
  selector: 'app-flickr-image-search',
  templateUrl: './flickr-image-search.component.html',
  styleUrls: ['./flickr-image-search.component.css']
})
export class FlickrImageSearchComponent implements OnInit {

  searchText: String;
  photos: any[];
  websiteId;
  pageId;
  userId;
  widgetId;
  widget;

  constructor(
    private flickrService: FlickrService,
    private widgetService: WidgetService,
    private activateRoute: ActivatedRoute,
    private router: Router) { }

  searchPhotos() {
    this.flickrService
      .searchPhotos(this.searchText)
      .subscribe(
        (data: any) => {
          console.log(data);
          let val = data._body;
          val = val.replace('jsonFlickrApi(', '');
          val = val.substring(0, val.length - 1);
          val = JSON.parse(val);
          console.log(val);
          this.photos = val.photos;
        }
      );
  }

  selectPhoto(photo) {
    let url = 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server;
    url += '/' + photo.id + '_' + photo.secret + '_b.jpg';

    if (this.widgetId === 'newId') {
      const newImage = new Widget('', 'IMAGE', '', '', '', '', url);
      this.widgetService.createWidget(this.pageId, newImage).subscribe(
        () => {
          this.router.navigate(['../..'], {relativeTo: this.activateRoute});
        }
      );
    } else {
      this.widget.url = url;
      this.widgetService.updateWidget(this.widget).subscribe(
        () => {
          this.router.navigate(['../..'], {relativeTo: this.activateRoute});
        }
      );
    }
  }

  ngOnInit() {
      this.activateRoute.params.subscribe((params: any) => {
        this.photos = [];
        this.userId = params['uid'];
        this.websiteId = params['wid'];
        this.pageId = params['pid'];
        this.widgetId = params['wgid'];
        this.widgetService.findWidgetById(params['wgid']).subscribe(
          (widget: Widget) => {
            this.widget = widget;
          }
        );
      });
  }

}
