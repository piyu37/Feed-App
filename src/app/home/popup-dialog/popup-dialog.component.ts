import {Component,Input, Output, ViewChild, OnInit} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap';
import { PostStatus } from '../../user/postStatus.component';
import { User } from '../../user/user.component';
import { ServiceComponent } from '../../service/service.component';
import { AlertService } from '../../service/alert.service';
import { ImageUploadModule } from "angular2-image-upload";
import { MainComponent } from '../main/main.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-popup-dialog',
  templateUrl: './popup-dialog.component.html',
  styleUrls: ['./popup-dialog.component.css']
})
export class PopupDialogComponent implements OnInit 
{
  currentUser: User;
  postImage:any;

  @ViewChild('popupModal') public popupModal:ModalDirective;
  @Input() title?:string;
  @Output()
  url;

  constructor(
    private userService: ServiceComponent, 
    private alertService: AlertService, 
    private main: MainComponent,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  // Method which will show popup box
  show(){
    this.popupModal.show();
  }

  // Method to hide popup box and clearing all the data inside the popup
  hide()
  {
    this.popupModal.hide();
    document.getElementById("photo-upload").style.display = "none";
    (<HTMLInputElement>document.getElementById("main-text")).value="";
    (<HTMLImageElement>document.getElementById("photo-upload")).src="";
  }

  // Method to get all information which is required for post and then to store in database using api
  postInformation()
  {
    let postText:string;
    let pImage:any;
    let postDate:Date;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let uid:number=this.currentUser.userId;
    let postUserName: string = this.currentUser.firstName + " " + this.currentUser.lastName;
    postText = (<HTMLInputElement>document.getElementById("main-text")).value;
    let postTextTrim = postText.trim();
    alert(postTextTrim);
    pImage = (<HTMLImageElement>document.getElementById("photo-upload")).src;
    alert(pImage);
    let imageExtension = "http://localhost:4200/";
    if(pImage == imageExtension)
    {
      pImage = pImage.replace(imageExtension, '');
    }

    if(postTextTrim != "" || pImage != "" )
    {
      postDate = new Date();
      let ampm = postDate.getHours() >= 12 ? 'pm' : 'am';
      let pDate = postDate.getFullYear() + "-" + (postDate.getMonth() + 1) + "-" + postDate.getDate() + " " + postDate.getHours() + ":" + postDate.getMinutes();
      let postStatus: PostStatus = new PostStatus(pDate, pImage, postText, uid, postUserName);
      console.log(Object.values(postStatus));
      this.userService.savePost(postStatus)
      .subscribe(
          data => {
              window.location.reload();
          },
          error => {
              this.alertService.error("please try again!!");
          });
      }
      this.hide();
  }

  // Method to preview the image what user selected at the time of post
  savingImage(input: any)
  {
    document.getElementById("photo-upload").style.display = "block";
    if (input.target.files && input.target.files[0])
    {
      var reader = new FileReader();
      this.postImage = URL.createObjectURL(input.target.files[0]);
      reader.onload = function ()
      {
          (<HTMLImageElement>document.getElementById('photo-upload')).src = reader.result;

      };
      //(<HTMLImageElement>document.getElementById("photo-upload")).src = URL.createObjectURL(input.target.files[0]);
      reader.readAsDataURL(input.target.files[0]);
    }
  }
}
