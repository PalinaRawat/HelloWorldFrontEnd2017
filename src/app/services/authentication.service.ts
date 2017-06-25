import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { JwtHelper } from 'angular2-jwt';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  jwtHelper: JwtHelper = new JwtHelper();

  constructor(private http: Http) { }


  login(email: string, password: string) {
        console.log("email", email);
        console.log("password", password);
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post('http://localhost:8000'+'/api/user/auth', {"email": email, "password": password }, options)
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                console.log("RESPONSE",response);
                let user = response.json();
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(this.jwtHelper.decodeToken(user.token)));
                    localStorage.setItem('token', user.token);
                    console.log("token decoded", this.jwtHelper.decodeToken(user.token));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

}
