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

  constructor(private signService: SignTemplateService) {
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
}
