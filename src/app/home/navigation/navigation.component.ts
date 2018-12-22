import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../service/authentication.service';
import { ServiceComponent } from '../../service/service.component';
import { User } from '../../user/user.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  getData: string;
  currentUser: User;
  users: User[] = [];

  constructor(private authenticationService: AuthenticationService) { 

    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  logout()
  {
    this.authenticationService.logout();
  }

}
