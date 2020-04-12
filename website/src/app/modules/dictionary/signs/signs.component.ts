import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoriesService} from '../../../shared/signs/services/categories.service';
import {SignModel} from '../../../shared/signs/models/sign.model';
import {SignTemplateService} from '../../../shared/signs/services/sign-template.service';
import {AppComponent} from '../../../app.component';

@Component({
  selector: 'app-signs',
  templateUrl: './signs.component.html',
  styleUrls: ['./signs.component.css']
})
export class SignsComponent implements OnInit {

  private currentSignCategory: string;
  noMoreSignsAvailable = false;
  signs: SignModel[];

  // ActivatedRoute module is needed to retrieve the URL parameter
  constructor(
    private route: ActivatedRoute,
    private signService: SignTemplateService) {
  }

  ngOnInit(): void {
    // Retrieve the parameter value of the parameter defined in the route in app.module.ts
    this.currentSignCategory = this.route.snapshot.paramMap.get('id');
    // Make sure the sign list gets updated if the available signs change
    // Todo: process the list mutiations only instead of assigning a new list
    this.signService.personalSigns.subscribe(s => {
      console.log(s);
      this.signs = s.filter(x => x.categoryId === this.currentSignCategory);
    });
    this.getSigns();
  }

  getSigns(): void {
    this.signService.loadNextBatchPersonalSigns(this.currentSignCategory)
      .then(numberUpdated => {
        console.log('Number signs added :' + numberUpdated);
        if (numberUpdated === 0) {
          this.noMoreSignsAvailable = true;
        }
      });
  }
}
