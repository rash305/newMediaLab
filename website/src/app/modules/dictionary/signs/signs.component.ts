import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoriesService} from '../../../shared/signs/services/categories.service';
import {SignModel} from '../../../shared/signs/models/sign.model';
import {SignTemplateService} from '../../../shared/signs/services/sign-template.service';
import {AppComponent} from '../../../app.component';
import {ISignTemplate} from '../../../shared/signs/models/isign-template';

@Component({
  selector: 'app-signs',
  templateUrl: './signs.component.html',
  styleUrls: ['./signs.component.css']
})
export class SignsComponent implements OnInit {
  @Output() ObjectClickedEventHandler = new EventEmitter<ISignTemplate>();
  @Input() isPersonalDictionary: boolean;
  @Input() currentSignCategory: string;
  currentSignCategoryTitle: string;
  noMoreSignsAvailable = false;
  signs: SignModel[];

  // ActivatedRoute module is needed to retrieve the URL parameter
  constructor(
    private route: ActivatedRoute,
    private signService: SignTemplateService) {
  }

  ngOnInit(): void {
    console.log(this.currentSignCategory);
    // Retrieve the parameter value of the parameter defined in the route in app.module.ts
    // Make sure the sign list gets updated if the available signs change
    // Todo: process the list mutations only instead of assigning a new list
    if (this.isPersonalDictionary) {
      this.signService.personalSigns.subscribe(s => {
        this.signs = s.filter(x => x.category.id === this.currentSignCategory);
      });
    } else {
      this.signService.personalSigns.subscribe(s => {
        this.signs = s.filter(x => x.category.id === this.currentSignCategory);
      });
    }

    this.getSigns();
  }

  getSigns(): void {
    this.signService.loadNextBatchSigns(this.currentSignCategory, this.isPersonalDictionary)
      .then(numberUpdated => {
        console.log('Number signs added :' + numberUpdated);
        if (numberUpdated === 0) {
          this.noMoreSignsAvailable = true;
        }
      });
  }
}
