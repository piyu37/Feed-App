import { Component, OnInit } from '@angular/core';

import { User } from '../user/user.component';
//import { Http, Response} from '@angular/http';
//import { Observable} from 'rxjs/Observable';
//import 'rxjs/add/operator/map';
import { ServiceComponent } from '../service/service.component';

@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})

export class HomeComponent implements OnInit {
    getData: string;
    currentUser: User;
    users: User[] = [];

    constructor(private userService: ServiceComponent) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }

    ngOnInit() {
        
    }
    /*
    deleteUser(id: number) {
        //this.userService.delete(id).subscribe(() => { this.loadAllUsers() });
    }
    */
}