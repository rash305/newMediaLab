import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SignDetailsModel} from '../../../../shared/signs/models/sign-details.model';
import {SignDetailsService} from '../../../../shared/signs/services/sign-details.service';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent implements OnInit {

  @Output() DeletePopupMinimalizeEvent = new EventEmitter();

  @Input() sign: SignDetailsModel;

  constructor(private signDetailsService: SignDetailsService) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.DeletePopupMinimalizeEvent.emit(true);
  }

  deleteSign() {
    // delete sign from favotieten
    this.sign.nrOfPersonal -= 1;
    this.sign.isPersonal = !this.sign.isPersonal;
    this.signDetailsService.unFavorite(this.sign).subscribe();
    this.DeletePopupMinimalizeEvent.emit(true);
  }
}
