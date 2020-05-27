import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryModel} from '../../models/category.model';
import {CategoriesService} from '../../services/categories.service';
import {ISignTemplate} from '../../models/isign-template';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  isPersonalDictionary = false;
  @Output() clickEventsEmitter = new EventEmitter<ISignTemplate>();

  loading = true;
  categories: CategoryModel[];

  constructor(private  categoriesService: CategoriesService) {}

  ngOnInit(): void {
    if (!this.isPersonalDictionary) {
      this.getCategories();
    } else {
      this.getPersonalCategories();
    }
  }

  getPersonalCategories(): void {
    this.categoriesService.getPersonalCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.loading = false;
      });
  }

  getCategories(): void {
    this.categoriesService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
        this.loading = false;
      });
  }
}
