import { Component, OnInit } from '@angular/core';
import {SignModel} from '../../../shared/signs/models/sign.model';
import {SignTemplateService} from '../../../shared/signs/services/sign-template.service';
import {Router} from '@angular/router';
import {SignDetailsService} from '../../../shared/signs/services/sign-details.service';

@Component({
  selector: 'app-test-results',
  templateUrl: './test-results.component.html',
  styleUrls: ['./test-results.component.css']
})
export class TestResultsComponent implements OnInit {

  learnedSigns: SignModel[];
  addedToPersonal = [];

  constructor(
    private signService: SignTemplateService,
    private signDetailsService: SignDetailsService) {
  }

  ngOnInit(): void {
    this.getAnswers();
  }

  getAnswers(): void {
    this.signService.publicSigns.subscribe(s => {
      this.learnedSigns = s;
      this.learnedSigns = this.learnedSigns.slice(0, 4);
    });
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
    //this.isAddedToPersonal = !this.isAddedToPersonal;
  }

}
