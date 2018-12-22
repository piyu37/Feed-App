import { Component, OnInit } from '@angular/core';
import { ServiceComponent } from '../../service/service.component';
import { User } from '../../user/user.component';
import {PostStatus} from '../../user/postStatus.component';
import { Comments } from '../../user/comments.component';
import { AlertService } from '../../service/alert.service';
import { Liker } from '../../user/liker.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit 
{
  getData: string;
  allPosts: any[];
  allComments: any[];
  CurrentUser: User;
  commenterName: string;
  tempPid:any;
  temporary:any = 0;
  allLikers:any[];

  constructor(private userService: ServiceComponent, private alertService: AlertService) { }

  ngOnInit() 
  {
    this.loadAllUsers();
  }

  public loadAllUsers() {
    this.userService.getAllPosts().subscribe(data => 
      {
        this.allPosts = data;
        //alert(this.allPosts);
      },
      error => console.log(error),
      () => console.log("finished")
      );
  }

  // method to show all comments
  showComments(pid: number):void
  {
    if(this.temporary != 0)
    {
      document.getElementById("sh-comm" + this.tempPid).style.display="none";
    }
    let postId = pid;
    // getting all comments of specific postid
    this.userService.getAllComments(postId).subscribe(data =>
      {
        this.allComments = data;
        if(this.allComments != null)
        {
          document.getElementById("sh-comm" + postId).style.display="block";  // initially comment section is hidden, so this show the comment section. 
          console.log(this.allComments);
        }
      },
            error => console.log(error),
            () => console.log("finished")
    );
    this.tempPid = pid;
    this.temporary = 1;
  }

  // method stores like in database of specific post
  likeClicked(pid:any): void
  {
    let tempUser = JSON.parse(localStorage.getItem('currentUser'));
    let likerName = tempUser.firstName + " " + tempUser.lastName;
    let array = new Array();
    let i;
    let localPid;
    if(JSON.parse(localStorage.getItem('temporaryPid'))!=null)
    {
      array = JSON.parse(localStorage.getItem('temporaryPid'));
      for(i = 0; i< array.length; i++)
        {
          if(array[i] == pid)
            localPid = array[i];
        }
    }
    document.getElementById(pid).innerHTML = "Liked"
    if(localPid != pid)
    {
      let tempUser = JSON.parse(localStorage.getItem('currentUser'));
      let likerName = tempUser.firstName + " " + tempUser.lastName;
      let likerObject:Liker = new Liker(likerName, pid);
      document.getElementById("total-likes"+pid).innerHTML=parseInt(document.getElementById("total-likes"+pid).innerHTML)+1+"";
      document.getElementById(pid).innerHTML = "Liked"
      localPid = pid;
      
      if(JSON.parse(localStorage.getItem('temporaryPid'))==null)
      {}
      else{
        array = JSON.parse(localStorage.getItem('temporaryPid'));      
      }
      array.push(localPid);
      localStorage.setItem('temporaryPid', JSON.stringify(array));
      this.userService.storeLikes(pid)
      .subscribe(
          data => {
            this.userService.saveLiker(likerObject).subscribe(
              data => {}
          )},
          error => {
              this.alertService.error("please try again!!");
          });
    }
  }

  // Method to save user comments on a specific post
  getComments(event:any)
  {
    let target = event.target || event.srcElement || event.currentTarget;
    let idAttr = target.attributes.id;
    let postId = idAttr.nodeValue;
    let commentText:string = (<HTMLInputElement>document.getElementById(postId)).value;
    this.CurrentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.commenterName = this.CurrentUser.firstName + " " + this.CurrentUser.lastName;
    postId = postId.replace('comment', '');
    let saveComment: Comments = new Comments(this.commenterName, commentText, postId);
    (<HTMLInputElement>document.getElementById("comment" + postId)).value="";
    document.getElementById("comment" + postId).blur();
    this.userService.storeComments(saveComment)
    .subscribe(
        data => {

          this.showComments(postId);

        },
        error => {
            this.alertService.error("please try again!!");
        });

  }

  // Method show who liked the post when user hover on no. of likes
  getLikedUsers(pid: number)
  {
    document.getElementById("liked-users" + pid).style.display="block";
    this.userService.getPostLikes(pid).subscribe(data => 
      {
                this.allLikers = data;
      },
      error => {

        this.alertService.error("please try again!!");
      });
  }

  // Method hide the likers when it is not hovered
  hideLikedUsers(pid: number)
  {
    document.getElementById("liked-users" + pid).style.display = "none";
    this.allLikers = null;
  }
}
