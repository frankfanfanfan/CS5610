import {Http} from '@angular/http';
import {Injectable} from '@angular/core';

@Injectable()
export class FlickrService {

  key = '4606f49f8b458226c968bfcb94b30dcb';
  secret = 'dd23de73b0cd925e';
  urlBase = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT';

  constructor(private _http: Http) {}

  searchPhotos(searchTerm: any) {
    const url = this.urlBase
      .replace('API_KEY', this.key)
      .replace('TEXT', searchTerm);
    return this._http.get(url);
  }

}
