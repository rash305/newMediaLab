import { Component, OnInit } from '@angular/core';
import {SignTemplateService} from '../../../shared/signs/services/sign-template.service';
import {SignModel} from '../../../shared/signs/models/sign.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-test-questions',
  templateUrl: './test-questions.component.html',
  styleUrls: ['./test-questions.component.css']
})
export class TestQuestionsComponent implements OnInit {

  maxQuestion = 2;
  questionNr = 1;
  correct = false;
  wrong = false;

  progressPercentage = (this.questionNr / this.maxQuestion) * 100;
  correctAnswer: SignModel;
  answers: SignModel[];
  score = '';
  imgFocus = '';

  constructor(
    private signService: SignTemplateService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getAnswers();
  }

  getAnswers(): void {
    this.signService.personalSigns.subscribe(s => {
      this.answers = s.filter(x => x.categoryId === '5eb5ebeb0c57e73817dbfb1a');
      this.answers = this.answers.slice(0, 4);
      this.correctAnswer = this.answers[0];
    });
  }

  goBack() {
    if (this.questionNr === 1) {
      console.log('learn');
      this.router.navigate(['/learn']);
    } else {
      console.log('vorige vraag');
    }
  }

  goFurther() {
    if (this.correct) {
      if (this.questionNr === this.maxQuestion) {
        this.router.navigate(['/learn/test-results']);
        console.log('einde');
      } else {
        this.questionNr = this.questionNr + 1;
        this.score = '';
        console.log('volgende vraag');
      }
      this.correct = false;
      this.wrong = false;
    }
  }

  checkAnswer(title: string) {
    if (this.correctAnswer.title === title) {
      this.correct = true;
      this.wrong = false;
      this.score = 'correct';
    } else {
      this.correct = false;
      this.wrong = true;
      this.score = 'wrong';
    }
    this.imgFocus = 'img-focus';
  }
}
