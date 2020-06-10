import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SignDetailsService} from '../../services/sign-details.service';
import {SignDetailsModel} from '../../models/sign-details.model';
import {EventEmitter} from '@angular/core';
import {VideoModel} from '../../models/video.model';

@Component({
  selector: 'app-sign-details',
  templateUrl: './sign-details.component.html',
  styleUrls: ['./sign-details.component.css']
})
export class SignDetailsComponent implements OnInit {

  @Output() parentId = new EventEmitter();

  @Input() isPersonalDictionary: boolean;

  @Input() currentSignId: string;
  @Input() sign: SignDetailsModel;

  hideDeletePopup = true;
  video: VideoModel;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private signDetailsService: SignDetailsService) {
  }

  ngOnInit(): void {
    // Retrieve the parameter value of the parameter defined in the route in app.module.ts
    // this.currentSignId = this.route.snapshot.paramMap.get('id');
    // Get details of sign
    this.getSign();
  }

  getSign(): void {
    this.signDetailsService.getSignDetails(this.currentSignId)
      .subscribe(data => {
        if (data) {
          this.sign = data;
          // Sort videos on popularity
          this.sign.videos.sort((a, b) => b.popularity - a.popularity);
          this.parentId.emit(data.category);
        }
      });
  }

  addToPersonal(video: VideoModel) {
    this.sign.nrOfPersonal += 1;
    this.sign.isPersonal = !this.sign.isPersonal;
    this.signDetailsService.favorite(this.sign, video).subscribe(x => {
      if (x) {
        this.routeAfterFavoriteUpdate();
      }
    });
  }

  routeAfterFavoriteUpdate() {
    const routingString = this.isPersonalDictionary ? '/dictionary' : '/personal';
    this.router.navigate([routingString], {
      queryParams: {id: this.sign.id, type: 'sign-details'},
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
  }

  removeFromPersonal(video: VideoModel) {
    this.signDetailsService.unFavorite(this.sign, video).subscribe(x => {
      if (x) {
        video.popularity -= 1;
        video.isFavorite = !video.isFavorite;
        this.sign.videos.sort((a, b) => b.popularity - a.popularity);
      }
    });
  }

  delete(video: VideoModel) {
    // Open popup to confirm deleting
    this.video = video;
    this.hideDeletePopup = !this.hideDeletePopup;
  }
}
