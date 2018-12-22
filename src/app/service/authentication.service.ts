import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { LoginAuthentication } from '../user/loginAuthentication.component';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {
    constructor(private http: Http) { }

    login(username: string, password: string):Observable<any> 
    {
        let login=new LoginAuthentication(username,password);
        return this.http.post('http://localhost:8084/Angular2FeedApp/validateUser', login)
        .map((response) => {
            });
    }

    getUserInformation(username: string):Observable<any>
    {
        return this.http.get('http://localhost:8084/Angular2FeedApp/userdata/' + username)
        .map((response: Response) => {
            let user = response.json();
            localStorage.setItem('currentUser', JSON.stringify(user));
        })
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('temporaryUser');
        localStorage.removeItem('temporaryPid');
    }
}