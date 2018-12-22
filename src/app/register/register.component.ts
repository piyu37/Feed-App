import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService } from '../service/alert.service';
import { ServiceComponent } from '../service/service.component';

@Component({
    moduleId: module.id,
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})

export class RegisterComponent {
    model: any = {};
    loading = false;

    constructor(
        private router: Router,
        private userService: ServiceComponent,
        private alertService: AlertService
    ) { }

    register() 
    {
        this.loading = true;
        this.userService.register(this.model)
            .subscribe(
                data => {
                    //this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error("username already exists");
                    this.loading = false;
                });
    }
}
