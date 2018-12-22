export class Comments
{
    commenterId:number;
    commenterName:string;
    commenterPic:string;
    commenterText: string;
    pid: number;
    

    constructor(commenterName:string, commenterText:string, pid: any)
    {
        this.commenterName = commenterName;
        this.commenterText = commenterText;
        this.pid = pid;
    }   
}