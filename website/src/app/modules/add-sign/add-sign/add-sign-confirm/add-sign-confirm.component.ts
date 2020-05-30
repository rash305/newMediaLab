import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SignDetailsModel} from '../../../../shared/signs/models/sign-details.model';

@Component({
  selector: 'app-add-sign-confirm',
  templateUrl: './add-sign-confirm.component.html',
  styleUrls: ['./add-sign-confirm.component.css']
})
export class AddSignConfirmComponent implements OnInit {

  @Output() ConfirmAddSignEvent = new EventEmitter();

  @Input() sign: SignDetailsModel;

  constructor() { }

  ngOnInit(): void {
  }

  goBack() {
    this.ConfirmAddSignEvent.emit('notConfirmed');
  }

  addSign() {
    this.ConfirmAddSignEvent.emit('confirmed');
  }

  changeImage() {
    // some fancy function that changes the image
  }
}
