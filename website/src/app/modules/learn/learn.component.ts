import {Component, OnInit} from '@angular/core';
import {SignTemplateService} from '../../shared/signs/services/sign-template.service';
import {SignModel} from '../../shared/signs/models/sign.model';
import {LearnTaskService} from '../../shared/learn/service/learn-task.service';
import {LearnTask} from '../../shared/learn/models/learn-task';
import {LearnSubTask} from '../../shared/learn/models/learn-sub-task';
import {SignDetailsModel} from '../../shared/signs/models/sign-details.model';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {

  signOfDay: SignModel;
  learnTask: LearnTask;

  constructor(private signService: SignTemplateService,
              private learnTaskService: LearnTaskService) {
    this.getLearnTask();
  }

  ngOnInit(): void {
    this.getSignOfDay();
  }

  getSignOfDay() {
    // get sign of the day from the sign service
    let signs: SignModel[];
    this.signService.publicSigns.subscribe(s => {
      signs = s;
      const index = Math.floor(Math.random() * signs.length);
      this.signOfDay = signs[index];
    });
    this.signService.loadNextBatchSigns(null);
  }

  getLearnTask() {
    const temporaryDemoValuePleaseRemove = true;
    if (temporaryDemoValuePleaseRemove) {
      this.learnTask = new LearnTask();
      this.learnTask.currentLearnTaskIndex = 1;
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

      this.learnTask.learnTasks = [subTask1, subTask1, subTask1];
    } else {
      this.learnTaskService.getLearnTask()
        .subscribe(learnTask => this.learnTask = learnTask);
    }
  }
}
