import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SignModel} from '../../../../shared/signs/models/sign.model';
import {LearnSubTask} from '../../../../shared/learn/models/learn-sub-task';

@Component({
  selector: 'app-quiz-question',
  templateUrl: './quiz-question.component.html',
  styleUrls: ['./quiz-question.component.css']
})
export class QuizQuestionComponent implements OnInit {

  @Output() messageQuizStatus = new EventEmitter<string>();

  @Input() learnSubTask: LearnSubTask;

  constructor() {
  }

  ngOnInit(): void {
  }

  goBack() {
    this.messageQuizStatus.emit('back');
  }

  goFurther() {
    if (this.learnSubTask.correctResponses.includes(this.learnSubTask.question)) {
      this.messageQuizStatus.emit('continue');
    }
  }

  checkAnswer(sign: SignModel) {
    if (this.learnSubTask.question === sign) {
      this.learnSubTask.addCorrectResponse(sign);
    } else {
      this.learnSubTask.addWrongResponse(sign);
    }
    this.learnSubTask.addCorrectResponse(sign);
  }
}
