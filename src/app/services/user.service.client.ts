import { User } from '../models/user.model.client';
import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import 'rxjs/Rx';
import {environment} from '../../environments/environment';

@Injectable()
export class UserService {

  constructor(private http: Http) {}

  baseUrl = environment.baseUrl;

  findUserByCredential(username, password) {
    const url = this.baseUrl + '/api/user?username=' + username + '&password=' + password;
    return this.http.get(url).map((response: Response) => {
        return response.json();
      });
  }

  findUserById(userId) {
    console.log(userId);
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.get(url).map((response: Response) => {
      return response.json();
    });
  }

  updateUser(user: User) {
    const url = this.baseUrl + '/api/user/' + user._id;
    return this.http.put(url, user).map((response: Response) => {
      console.log(user);
      return response.json();
    });
  }

  createUser(user: User) {
    const url = this.baseUrl + '/api/user';
    return this.http.post(url, user).map((response: Response) => {
      console.log(user);
      return response.json();
    });
  }

  deleteUserById(userId) {
    const url = this.baseUrl + '/api/user/' + userId;
    return this.http.delete(url).map((response: Response) => {
      return response.json();
    });
  }
}
