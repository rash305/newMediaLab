import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryModel} from '../../../shared/signs/models/category.model';
import {CategoriesService} from '../../../shared/signs/services/categories.service';

@Component({
  selector: 'app-add-sign',
  templateUrl: './add-sign.component.html',
  styleUrls: ['./add-sign.component.css']
})
export class AddSignComponent implements OnInit {

  meaning: string;
  meaningError: string;
  category = '';
  categoryError: string;

  video: string;
  videoError: string;

  private requiredError = ' moet worden ingevuld';

  videoSelected = false;

  categories: CategoryModel[];

  @Output() AddSignMinimalizeEvent = new EventEmitter();

  constructor(private router: Router,
              private categoriesService: CategoriesService) { }

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this.categoriesService.getCategories()
      .subscribe(categories => {
        this.categories = categories;
      });
  }

  addSign(): void {
    // All validation checks
    if ([this.validateMeaning(this.meaning),
      this.validateCategory(this.category),
      this.validateVideo(this.video)].every(Boolean)) {

      // Send object to backend API
      this.doSomethingInService();

      // Go to categories page (and be logged in)
      this.AddSignMinimalizeEvent.emit(true);
      this.router.navigate(['/categories']);
    }
  }

  validateMeaning(meaning): boolean {
    if (!meaning) {
      this.meaningError = 'Betekenis' + this.requiredError;
      return false;
    }

    this.meaningError = '';
    return true;
  }

  validateCategory(category): boolean {
    if (!category) {
      this.categoryError = 'Categorie' + this.requiredError;
      return false;
    }

    this.categoryError = '';
    return true;
  }

  validateVideo(video): boolean {
    if (!video) {
      this.videoError = 'Video moet worden geselecteerd';
      return false;
    }

    this.videoError = '';
    return true;
  }

  private doSomethingInService() {
    // Add sign to the dictionary and favorieten
  }

  goBack(): void {
    this.AddSignMinimalizeEvent.emit(true);
  }

  addCamera() {
    // open camera to make a video
    this.video = 'Show a pretty video';
    this.validateVideo(this.video);
    this.videoSelected = true;
  }

  addGallery() {
    // open gallery to select a video
    this.video = 'Show a pretty video';
    this.validateVideo(this.video);
    this.videoSelected = true;
  }
}
