import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SignDetailsModel} from '../../../../shared/signs/models/sign-details.model';
import {SignDetailsService} from '../../../../shared/signs/services/sign-details.service';
import {Router} from '@angular/router';
import {VideoModel} from '../../../../shared/signs/models/video.model';

@Component({
  selector: 'app-delete-popup',
  templateUrl: './delete-popup.component.html',
  styleUrls: ['./delete-popup.component.css']
})
export class DeletePopupComponent implements OnInit {

  @Output() DeletePopupMinimalizeEvent = new EventEmitter();

  @Input() sign: SignDetailsModel;
  @Input() video: VideoModel;

  constructor(private signDetailsService: SignDetailsService,
              private router: Router) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.DeletePopupMinimalizeEvent.emit(true);
  }

  deleteSign() {
    // delete sign from favotieten
    this.sign.nrOfPersonal -= 1;
    this.sign.isPersonal = !this.sign.isPersonal;
    this.signDetailsService.unFavorite(this.sign, this.video).subscribe(x => {
      this.routeAfterFavorateUpdate();
    });
  }

  routeAfterFavorateUpdate() {
    this.router.navigate(['/dictionary'], {
      queryParams: {id: this.sign.id, type: 'sign-details'},
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
  }
}
