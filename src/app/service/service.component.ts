import { Component, Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import { Observable} from 'rxjs/Observable';
import { User} from '../user/user.component';
import { PostStatus} from '../user/postStatus.component';
import { Comments } from '../user/comments.component';
import { Liker } from '../user/liker.component';
import 'rxjs/add/operator/map';


@Injectable()
export class ServiceComponent {

  constructor(private _http: Http) { }

  register(user: User):Observable<any>
  {
    return this._http.post('http://localhost:8084/Angular2FeedApp/register', user)
    .map((response) => 
    {
    });
  }

  savePost(post: PostStatus):Observable<any>
  {
    return this._http.post('http://localhost:8084/Angular2FeedApp/post', post)
    .map((response) => 
    {
      
    });
  }

  getAllPosts():Observable<any>
  {
    return this._http.get('http://localhost:8084/Angular2FeedApp/userposts')
    .map(res => res.json() );
  }

  storeComments(commentObject: Comments):Observable<any>
  {
    return this._http.post('http://localhost:8084/Angular2FeedApp/comments', commentObject)
    .map((response) => 
    {
      
    });
  }

  getAllComments(pid: number):Observable<any>
  {
    return this._http.get('http://localhost:8084/Angular2FeedApp/commentdata/' + pid)
    .map(res => res.json() );
  }

  storeLikes(pid: number):Observable<any>
  {
    return this._http.get('http://localhost:8084/Angular2FeedApp/likes/' + pid)
    .map((response) => 
    {
      
    }); 
  }

  // api tells who liked the post and the name who liked it will store in database
  saveLiker(liker: Liker):Observable<any>
  {
    return this._http.post('http://localhost:8084/Angular2FeedApp/saveliker', liker)
    .map((response) => 
    {
      
    });
  }
  // Retrieve all name who liked the post
  getPostLikes(postId: number):Observable<any>
  {
    return this._http.get('http://localhost:8084/Angular2FeedApp/postliker/' + postId)
    .map(res => res.json() );
  }

}
