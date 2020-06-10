import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SignModel} from '../../../../shared/signs/models/sign.model';
import {SignTemplateService} from '../../../../shared/signs/services/sign-template.service';
import {Router} from '@angular/router';
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
  addedToPersonalIDs: string[] = [];

  constructor(private signDetailsService: SignDetailsService) {
  }

  ngOnInit(): void {
  }

  addToPersonal(sign: SignDetailsModel) {
    if (sign.isPersonal) {
      this.signDetailsService.unFavorite(sign, sign.videos.pop()).subscribe();
    } else {
      this.signDetailsService.favorite(sign, sign.videos.pop()).subscribe();
    }
    sign.isPersonal = !sign.isPersonal;
  }
}
