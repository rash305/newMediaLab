import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SignDetailsModel} from '../../../../shared/signs/models/sign-details.model';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent implements OnInit {

  @Output() DeletePopupMinimalizeEvent = new EventEmitter();

  @Input() sign: SignDetailsModel;

  constructor() { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.DeletePopupMinimalizeEvent.emit(true);
  }

  deleteSign() {
    // delete sign from favotieten

    this.DeletePopupMinimalizeEvent.emit(true);
  }
}
