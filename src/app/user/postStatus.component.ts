import {User} from './user.component';
export class PostStatus
{
    postId:number;
    postText:string;
    postImage:any;
    postDate:string;
    postLikes:number;
    postComment:number;
    uid: number;
    postUserName: string;
    UComments: any[];

    constructor(postDate:string, pImage:any, postText:string, uid: any, postUserNmae:string)
    {
        this.postDate = postDate;
        this.postImage = pImage;
        this.postText = postText;        
        this.uid = uid;
        this.postUserName = postUserNmae;
    }   
}