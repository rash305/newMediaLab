import { Component, OnInit } from '@angular/core';
import {LearnTask} from '../../../shared/learn/models/learn-task';
import {LearnTaskService} from '../../../shared/learn/service/learn-task.service';
import {LearnSubTask} from '../../../shared/learn/models/learn-sub-task';
import {SignDetailsModel} from '../../../shared/signs/models/sign-details.model';
import {SignModel} from '../../../shared/signs/models/sign.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  learnTask: LearnTask;

  maxQuestion = 3;
  questionNr = 1;

  progressPercentage = (this.questionNr / this.maxQuestion) * 100;

  private quizStatus: string;

  constructor(private learnTaskService: LearnTaskService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.quizStatus = 'question';
    this.quizStatus = 'results';

    this.getLearnTask();
  }

  getLearnTask() {
    const temporaryDemoValuePleaseRemove = true;
    if (temporaryDemoValuePleaseRemove) {
      this.learnTask = new LearnTask();
      this.learnTask.currentLearnTaskIndex = 0;
      const subTask1 = new LearnSubTask();
      const correctAnswer = new SignDetailsModel();
      correctAnswer.title = 'test';
      correctAnswer.image = 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg';
      correctAnswer.id = '1';
      correctAnswer.video = 'Pretty video';

      const option1 = new SignModel();
      option1.title = 'Kip';
      option1.image = 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg';
      option1.id = '2';
      const option2 = new SignModel();
      option2.title = 'Honkbal';
      option2.image = 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg';
      option2.id = '3';
      const option3 = new SignModel();
      option3.title = 'Korfbal';
      option3.image = 'https://interactive-examples.mdn.mozilla.net/media/examples/grapefruit-slice-332-332.jpg';
      option3.id = '4';
      subTask1.question = correctAnswer;
      subTask1.optionalAnswers = [option1, correctAnswer, option3, option2];

      const subTask2 = new LearnSubTask();
      subTask2.question = correctAnswer;
      subTask2.optionalAnswers = [option1, correctAnswer, option2, option3];

      const subTask3 = new LearnSubTask();
      subTask3.question = correctAnswer;
      subTask3.optionalAnswers = [option2, option1, correctAnswer, option3];

      this.learnTask.learnTasks = [subTask1, subTask2, subTask3];
    } else {
      this.learnTaskService.getLearnTask()
        .subscribe(learnTask => this.learnTask = learnTask);
    }
  }

  receiveQuizStatus($event: string) {
    if ($event === 'back') {
      if (this.questionNr === 1) {
        this.router.navigate(['/learn']);
      } else {
        this.learnTask.currentLearnTaskIndex = this.learnTask.currentLearnTaskIndex - 1;
        this.quizStatus = 'question';
      }
    } else if ($event === 'continue') {
      if (this.questionNr === this.maxQuestion) {
        this.quizStatus = 'results';
      } else {
        this.learnTask.currentLearnTaskIndex = this.learnTask.currentLearnTaskIndex + 1;
        this.quizStatus = 'question';
      }
    } else if ($event === 'restart') {
      this.ngOnInit();
    }
    this.quizStatus = 'results';

    this.questionNr = this.learnTask.currentLearnTaskIndex + 1;
  }

  show(status: string): boolean {
    return this.quizStatus === status;
  }

  getLearnedSigns(): SignModel[] {
    return this.learnTask.getLearnedSigns();
  }
}
