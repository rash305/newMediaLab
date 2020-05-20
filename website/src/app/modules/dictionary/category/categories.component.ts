import {Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from '../../../shared/signs/models/category.model';
import {CategoriesService} from '../../../shared/signs/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  @Input()
  isPersonalDictionary = false;

  loading = true;
  categories: CategoryModel[];

  constructor(private  categoriesService: CategoriesService) {
  }

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
