import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }    from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ModalDirective, ModalModule } from 'ngx-bootstrap';
import { User } from './user/user.component';
import { PostStatus } from './user/postStatus.component';
import { LoginAuthentication } from './user/loginAuthentication.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { routing } from './app.routing';
import { RegisterComponent } from './register/register.component';
import { ServiceComponent } from './service/service.component';
import { NavigationComponent } from './home/navigation/navigation.component';
import { PostComponent } from './home/post/post.component';
import { PopupDialogComponent } from './home/popup-dialog/popup-dialog.component';
import { MainComponent } from './home/main/main.component';
import { AlertComponent } from './alert/alert.component';
import { AlertService } from './service/alert.service';
import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './service/authentication.service';
import { ImageUploadModule } from "angular2-image-upload";
import {NgPipesModule} from 'ngx-pipes';
import { Comments } from './user/comments.component';
import { Liker } from './user/liker.component';





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavigationComponent,
    PostComponent,
    PopupDialogComponent,
    MainComponent,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ModalModule.forRoot(),
    ImageUploadModule.forRoot(),
    HttpModule,
    NgPipesModule,
    routing
  ],
  providers: [
    AuthGuard,
    ServiceComponent,
    AuthenticationService,
    AlertService,
    MainComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
