import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoriesService} from '../../services/categories.service';
import {SignModel} from '../../models/sign.model';
import {SignTemplateService} from '../../services/sign-template.service';
import {AppComponent} from '../../../../app.component';
import {ISignTemplate} from '../../models/isign-template';
import {CategoryModel} from '../../models/category.model';
import {Subscription} from 'rxjs';

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
  signSubscription: Subscription;

  searchTerm: string;

  @Input()
  public set setSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.signSubscription = this.subscribeSigns();

  }

  // ActivatedRoute module is needed to retrieve the URL parameter
  constructor(
    private route: ActivatedRoute,
    private signService: SignTemplateService) {
  }

  ngOnInit(): void {
    this.signSubscription = this.subscribeSigns();
    this.getSigns();

  }

  private subscribeSigns(): Subscription {
    if (this.signSubscription) {
      this.signSubscription.unsubscribe();
    }

    if (this.isPersonalDictionary) {
      return this.signService.personalSigns.subscribe(s => {
        this.signs = s.filter(x => x.category.id === this.currentSignCategory);
      });
    } else {
      return this.signService.publicSigns.subscribe(s => {
        if (this.searchTerm) {
          this.signs = s.filter(x => x.title.toLowerCase().includes(this.searchTerm.toLowerCase()));
          if (this.currentSignCategory) {
            this.signs = this.signs.filter(x => x.category.id === this.currentSignCategory);
          }
        } else {
          this.signs = s.filter(x => x.category.id === this.currentSignCategory);
        }
      });
    }
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
