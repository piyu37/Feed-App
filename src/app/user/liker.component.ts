export class Liker
{
    likerName: string;
    postId:number;

    constructor(likerName: string, postId:number)
    {
        this.likerName = likerName;
        this.postId = postId;
    }
}