import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryModel} from '../../../shared/signs/models/category.model';
import {CategoriesService} from '../../../shared/signs/services/categories.service';
import {SignDetailsModel} from '../../../shared/signs/models/sign-details.model';
import {AccountService} from '../../../shared/account/services/account.service';
import {SignDetailsService} from '../../../shared/signs/services/sign-details.service';

@Component({
  selector: 'app-add-sign',
  templateUrl: './add-sign.component.html',
  styleUrls: ['./add-sign.component.css']
})
export class AddSignComponent implements OnInit {

  meaning: string;
  meaningError: string;
  categoryId = '';
  categoryError: string;

  video: string;
  videoError: string;

  private requiredError = ' moet worden ingevuld';

  videoSelected = false;

  categories: CategoryModel[];

  @Output() AddSignMinimalizeEvent = new EventEmitter();

  constructor(private router: Router,
              private categoriesService: CategoriesService,
              private signDetailsService: SignDetailsService) { }

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
      this.validateCategory(this.categoryId),
      this.validateVideo(this.video)].every(Boolean)) {

      const categoryTitle = this.categories.find(x => x.id === this.categoryId).title;

      // Send object to backend API
      const signDetails = new SignDetailsModel(null, this.meaning, this.categoryId,
        categoryTitle, 'https://w.wallhaven.cc/full/2e/wallhaven-2evglg.jpg', this.video);
      this.addSignToApp(signDetails);

      // Go to categories page (and be logged in)
      // this.router.navigate(['/personal']);
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

  validateCategory(categoryId): boolean {
    console.log(categoryId);
    if (!categoryId) {
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

  private addSignToApp(signDetails: SignDetailsModel): void {
    // Add sign to app
    this.signDetailsService.addSign(signDetails).subscribe(sign => {
      if (sign === null) {
        // Failed to add sign
        // Toaster message is enough for now
        console.log('Marit failed');
      } else {
        // close popup
        console.log('Marit succeded');
        this.AddSignMinimalizeEvent.emit(true);
      }
    });
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
