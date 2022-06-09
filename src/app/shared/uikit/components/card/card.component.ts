import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { types } from 'src/app/shared/utils/constants';
import { BachecaService } from '../../services/bacheca/bacheca.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input('background') background: string | undefined;
  @Input('title') title: string | undefined;
  @Input('text') text: string | undefined;
  @Input('author') author: string | undefined;
  @Input('link') link: string | undefined;
  @Input('textLink') textLink: string | undefined;
  @Input('postId') postId: any;
  @Input('isBacheca') isBacheca: any;
  @Output('deletePost') deletePost = new EventEmitter();
  

  

  // admin:boolean = true;
  copy:boolean=true;
  isClicked: boolean = false;
  // showModal: boolean = false;

  constructor(private bachecaService: BachecaService, private toastService: ToastService, private router: Router) { }

  ngOnInit(): void {
  }

  clicked(){
   this.isClicked = true;
  // this.showModal = true;
  }

  back(){
    this.isClicked = false;
  }

  delete(){
    this.deletePost.emit(this.postId);
    // this.toastService.newEvent.emit(this.postId);
    console.log(this.postId);
  }
  editPost(){
    this.router.navigate(['home/aggiungi', this.postId, this.isBacheca ? types.BACHECA : types.CONVENZIONI])
  }

}
