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
  addedToPersonalIDs: string[] = [];

  constructor(private signDetailsService: SignDetailsService) {
  }

  ngOnInit(): void {
  }

  addToPersonal(sign: SignModel) {
    if (this.addedToPersonalIDs.includes(sign.id)) {
      this.addedToPersonalIDs = this.addedToPersonalIDs.filter(s => s !== sign.id);
    } else {
      this.addedToPersonalIDs.push(sign.id);
    }
    // this.signDetailsService.favorite(sign).subscribe();
  }

  removeFromPersonal(sign: SignModel) {
    // this.isAddedToPersonal = !this.isAddedToPersonal;
  }

}
