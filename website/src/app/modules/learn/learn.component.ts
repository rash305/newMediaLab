import { Component, OnInit } from '@angular/core';
import {SignTemplateService} from '../../shared/signs/services/sign-template.service';
import {SignModel} from '../../shared/signs/models/sign.model';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {

  signOfDay: SignModel;

  constructor(private signService: SignTemplateService) { }

  ngOnInit(): void {
    this.getSignOfDay();
  }

  getSignOfDay() {
    // get sign of the day from the sign service
    let signs: SignModel[];
    this.signService.personalSigns.subscribe(s => {
      console.log(s);
      signs = s.filter(x => x.categoryId === '5eb5ebeb0c57e73817dbfb1a');
      const index = Math.floor(Math.random() * signs.length);
      this.signOfDay = signs[index];
    });
  }
}
