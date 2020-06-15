import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SignDetailsService} from '../../../../shared/signs/services/sign-details.service';
import {SignDetailsModel} from '../../../../shared/signs/models/sign-details.model';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {

  @Output() messageQuizStatus = new EventEmitter<string>();

  @Input() learnedSigns: SignDetailsModel[];

  constructor(private signDetailsService: SignDetailsService) {
  }

  ngOnInit(): void {
  }

  addToPersonal(sign: SignDetailsModel) {
    const video = sign.videos[0];
    if (video.isFavorite) {
      this.signDetailsService.unFavorite(sign, video).subscribe(x => {
        if (x) {
          video.isFavorite = !video.isFavorite;
        }
      });
    } else {
      this.signDetailsService.favorite(sign, video).subscribe(x => {
        if (x) {
          video.isFavorite = !video.isFavorite;
        }
      });
    }
  }
}
