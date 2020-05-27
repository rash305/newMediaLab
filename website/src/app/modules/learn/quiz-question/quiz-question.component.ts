import { Component, OnInit } from '@angular/core';
import {SignTemplateService} from '../../../shared/signs/services/sign-template.service';
import {SignModel} from '../../../shared/signs/models/sign.model';
import {Router} from '@angular/router';
import {LearnTaskService} from '../../../shared/learn/service/learn-task.service';
import {LearnTask} from '../../../shared/learn/models/learn-task';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {

  maxQuestion = 3;
  questionNr = 1;
  correctIndices = [];
  wrongIndices = [];

  progressPercentage = (this.questionNr / this.maxQuestion) * 100;
  correctAnswerIndex;
  answers: SignModel[];
  learnTask: LearnTask;

  constructor(
    private signService: SignTemplateService,
    private learnTaskService: LearnTaskService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.getLearnTask();
    this.getAnswers();
  }

  getLearnTask(): void {
    this.learnTaskService.getLearnTask()
      .subscribe(learnTask => {
          this.learnTask = learnTask;
          this.questionNr = Number(this.learnTask.currentLearnTaskIndex);
        });
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
