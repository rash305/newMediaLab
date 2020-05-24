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
  isAddedToPersonal = false;
  purpleIcon = {
    color: '#444444'
  };

  constructor(
    private signService: SignTemplateService,
    private signDetailsService: SignDetailsService) {
  }

  ngOnInit(): void {
    this.getAnswers();
  }

  getAnswers(): void {
    this.signService.personalSigns.subscribe(s => {
      this.learnedSigns = s.filter(x => x.category.id === '5eb5ebeb0c57e73817dbfb1a');
      this.learnedSigns = this.learnedSigns.slice(0, 2);
    });
  }

  addToPersonal(sign: SignModel) {
    this.purpleIcon = {
      color: '#593196'
    };
    this.isAddedToPersonal = !this.isAddedToPersonal;
    // this.signDetailsService.favorite(sign).subscribe();
  }

  removeFromPersonal(sign: SignModel) {
    this.purpleIcon = {
      color: '#444444'
    };
    this.isAddedToPersonal = !this.isAddedToPersonal;
  }

}
