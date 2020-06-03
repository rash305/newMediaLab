import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {CategoryModel} from '../../../shared/signs/models/category.model';
import {ActivatedRoute, Router, RouterEvent, RoutesRecognized} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {SignModel} from '../../../shared/signs/models/sign.model';
import {ISignTemplate} from '../../../shared/signs/models/isign-template';

@Component({
  selector: 'app-public-dictionary',
  templateUrl: './public-dictionary.component.html',
  styleUrls: ['./public-dictionary.component.css']
})
export class PublicDictionaryComponent implements OnInit {
  @Output() childClickEvents;
  navigateBackEvent;
  childId: string;
  childType: string;

  navigateBackModel: ISignTemplate;
  categoryType = 'category';
  signType = 'sign';
  signDetailsType = 'sign-details';

  searchTerm: string;
  private searchByCategory: boolean;

  constructor(private router: Router, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.childId = this.route.snapshot.queryParamMap.get('id');
    this.childType = this.route.snapshot.queryParamMap.get('type') ?? this.categoryType;
  }

  ObjectClickedEventHandler(object: ISignTemplate) {
    if (object instanceof CategoryModel) {
      this.updateUrl(object.id, this.signType);
      this.childType = this.signType;
      this.childId = object.id;
      this.navigateBackModel = object;
      this.searchTerm = '';
    }

    if (object instanceof SignModel) {
      this.updateUrl(object.id, this.signDetailsType);
      this.childType = this.signDetailsType;
      this.childId = object.id;
    }
    // this.searchTerm = '';
  }

  private updateUrl(id: string, type: string) {
    // changes the route without moving from the current view or
    // triggering a navigation event,
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        id,
        type
      },
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
  }

  navigateBack() {
    switch (this.childType) {
      case this.signType:
        this.childType = this.categoryType;
        this.childId = this.categoryType;
        this.updateUrl('', this.categoryType);
        break;
      case this.signDetailsType:
        if (this.searchTerm && !this.searchByCategory) {
          this.childId = null;
          // this.navigateBackModel = null;
        } else {
          this.childId = this.navigateBackModel.id;
        }
        this.childType = this.signType;
        this.updateUrl(this.navigateBackModel.id, this.signType);
        break;
    }
  }

  search($event: string) {
    this.searchTerm = $event;
    if (this.childType !== this.signType) {
      this.searchByCategory = false;
      this.childId = null;
      this.navigateBackModel = null;
    } else {
      this.searchByCategory = true;
    }
    this.childType = this.signType;
    this.updateUrl(this.searchTerm, 'search');
  }
}
