import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {CategoryModel} from '../../../shared/signs/models/category.model';
import {CategoriesService} from '../../../shared/signs/services/categories.service';

@Component({
  selector: 'app-sign-of-day',
  templateUrl: './sign-of-day.component.html',
  styleUrls: ['./sign-of-day.component.css']
})
export class SignOfDayComponent implements OnInit {

  category: CategoryModel;
  signId: string;

  constructor(private route: ActivatedRoute,
              private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.signId = this.route.snapshot.paramMap.get('sign-id');
    this.getCategory(this.route.snapshot.paramMap.get('category-id'));
  }

  getCategory(categoryId: string): void {
    this.categoriesService.getCategories()
      .subscribe(categories => {
        for (const cat of categories) {
          if (cat.id === categoryId) {
            this.category = cat;
          }
        }
      });

  }

}
