import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../../shared/signs/models/category.model';
import {CategoriesService} from '../../../shared/signs/services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: CategoryModel[];
  constructor(private  categoriesService: CategoriesService) {
  }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getPersonalCategories()
      .subscribe(categories => (this.categories = categories));
  }
}
