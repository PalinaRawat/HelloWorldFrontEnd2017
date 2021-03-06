import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { environment } from '../../environments';

import { User } from '../user';
import { Application } from '../application';

@Injectable()
export class UserService {

  constructor(private http: Http) { }

  create(user: User) {
      return this.http.post(environment.apiUrl+'/api/user/register', user).map((response: Response) => response.json());
  }

  apply(application: Application) {
      return this.http.post(environment.apiUrl+'/api/user/apply', this.convertJsonToFormData(application), this.jwt()).map((response: Response) => response.json());
  }

  updateApplication(application: Application) {
      return this.http.post(environment.apiUrl+'/api/user/updateApplication', this.convertJsonToFormData(application), this.jwt()).map((response: Response) => response.json());
  }

  getApplication() {
      return this.http.get(environment.apiUrl+'/api/user/application', this.jwt()).map((response: Response) => response.json());
  }

  userSearch(searchKey: string) {
      return this.http.post(environment.apiUrl+'/api/user/search', {"searchvalue": searchKey}, this.jwt()).map((response: Response) => response.json());
  }

  loadFromLocalStorage() {
    let currentUser = new User();
    let jsonData = JSON.parse(localStorage.getItem("currentUser"));
    if(jsonData){
      currentUser.firstname = jsonData.firstname;
      currentUser.lastname = jsonData.lastname;
      currentUser.roles = jsonData.roles;
      currentUser.verified = jsonData.verified;
      return currentUser;
    } else {
      return null;
    }
  }

  public convertJsonToFormData(item){
    var formData = new FormData();

    for (var key in item) {
      if(item[key])
        formData.append(key, item[key]);
    }

    return formData;
  }

  // private helper methods

  private jwt() {
      // create authorization header with jwt token
      //let currentUser = JSON.parse(localStorage.getItem('currentUser'));
      let token = localStorage.getItem('token');
      if (token) {
          let headers = new Headers({ 'Authorization': 'Bearer ' + token });
          return new RequestOptions({ headers: headers });
      }
  }

}
