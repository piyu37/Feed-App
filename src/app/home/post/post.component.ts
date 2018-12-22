import { Component, ViewChild, NgModule,ViewContainerRef,OnInit,ElementRef } from '@angular/core';
import { ModalDirective,ModalModule } from 'ngx-bootstrap';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  @ViewChild('popupModal') popupModal:PopupDialogComponent;  
  constructor() { }

  ngOnInit() {
  }

}
