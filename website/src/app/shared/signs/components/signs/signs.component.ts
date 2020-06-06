import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SignModel} from '../../models/sign.model';
import {SignTemplateService} from '../../services/sign-template.service';
import {ISignTemplate} from '../../models/isign-template';
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
    // Unsubscribe from previous sign list
    if (this.signSubscription) {
      this.signSubscription.unsubscribe();
    }

    // Subscribe to new sign list
    if (this.isPersonalDictionary) {
      return this.signService.personalSigns.subscribe(s => {
        this.signs = s.filter(x => x.category.id === this.currentSignCategory);
      });
    } else if (this.searchTerm) {
      return this.signService.getSearchedSigns(this.searchTerm)
        .subscribe(s => {
          if (this.currentSignCategory) {
            this.signs = s.filter(x => x.category.id === this.currentSignCategory);
          } else {
            this.signs = s;
          }
        });
    } else {
      return this.signService.publicSigns.subscribe(s => {
        this.signs = s.filter(x => x.category.id === this.currentSignCategory);
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
