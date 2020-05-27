import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SignModel} from '../../../../shared/signs/models/sign.model';
import {SignTemplateService} from '../../../../shared/signs/services/sign-template.service';
import {Router} from '@angular/router';
import {SignDetailsService} from '../../../../shared/signs/services/sign-details.service';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.css']
})
export class QuizResultsComponent implements OnInit {

  @Output() messageQuizStatus = new EventEmitter<string>();

  @Input() learnedSigns: SignModel[];
  addedToPersonal = [];

  constructor(private signDetailsService: SignDetailsService) {
  }

  ngOnInit(): void {
  }

  addToPersonal(sign: SignModel) {
    if (this.addedToPersonal.includes(sign)) {
      this.addedToPersonal = this.addedToPersonal.filter(s => s !== sign);
    } else {
      this.addedToPersonal.push(sign);
    }
    // this.signDetailsService.favorite(sign).subscribe();
  }

  removeFromPersonal(sign: SignModel) {
    // this.isAddedToPersonal = !this.isAddedToPersonal;
  }

}
