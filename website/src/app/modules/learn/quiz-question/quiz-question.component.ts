import { Component, OnInit } from '@angular/core';
import {SignTemplateService} from '../../../shared/signs/services/sign-template.service';
import {SignModel} from '../../../shared/signs/models/sign.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {

  constructor(
    private signService: SignTemplateService,
    private router: Router) {
  }

  maxQuestion = 2;
  questionNr = 1;
  correctIndices = [];
  wrongIndices = [];

  progressPercentage = (this.questionNr / this.maxQuestion) * 100;
  correctAnswerIndex;
  answers: SignModel[];

  ngOnInit(): void {
    this.getAnswers();
  }

  getAnswers(): void {
    this.signService.publicSigns.subscribe(s => {
      this.answers = s;
      this.answers = this.answers.slice(0, 4);
      this.correctAnswerIndex = Math.floor(Math.random() * this.answers.length);
    });
  }

  goBack() {
    if (this.questionNr === 1) {
      console.log('learn');
      this.router.navigate(['/learn']);
    } else {
      this.questionNr = this.questionNr - 1;
      console.log('vorige vraag');
    }
  }

  goFurther() {
    if (this.correctIndices.includes(this.correctAnswerIndex)) {
      if (this.questionNr === this.maxQuestion) {
        this.router.navigate(['/learn/quiz-results']);
        console.log('einde');
      } else {
        this.questionNr = this.questionNr + 1;
        console.log('volgende vraag');
      }
      this.correctIndices = [];
      this.wrongIndices = [];
    }
  }

  checkAnswer(index) {
    if (this.correctAnswerIndex === index) {
      this.correctIndices.push(index);
    } else {
      this.wrongIndices.push(index);
    }
  }
}
