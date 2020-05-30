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
  showConfirmationScreen = false;
  sign: SignDetailsModel;

  categories: CategoryModel[];

  @Output() AddSignMinimalizeEvent = new EventEmitter();

  constructor(private router: Router,
              private categoriesService: CategoriesService,
              private signDetailsService: SignDetailsService) {
  }

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

      const categoryModel = this.categories.find(x => x.id === this.categoryId);
      // Send object to backend API
      const signDetails = new SignDetailsModel().deserialize({
          title: this.meaning, categoryId: this.categoryId,
          category: categoryModel, image: 'https://picsum.photos/200/200', video: this.video
        });
      // Go to confirmation screen for user to confirm sign
      this.sign = signDetails;
      this.showConfirmationScreen = true;

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
      } else {
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

  addUpload() {
    // open gallery to select a video
    this.video = 'Show a pretty video';
    this.validateVideo(this.video);
    this.videoSelected = true;
  }

  confirm($event: string) {
    if ($event === 'confirmed') {
      // Sign is accepted, thus add sign to app and close popup
      this.addSignToApp(this.sign);
      this.emptyVariables();
      this.showConfirmationScreen = false;
      this.AddSignMinimalizeEvent.emit(true);
    } else if ($event === 'notConfirmed') {
      // Sign is not confirmed, thus do nothing and wait for next action of user
      this.showConfirmationScreen = false;
    } else if ($event === 'closed') {
      // User clicked next to the popup, thus do nothing and close both popups
      this.showConfirmationScreen = false;
      this.AddSignMinimalizeEvent.emit(true);
    }
  }

  private emptyVariables() {
    this.meaning = '';
    this.meaningError = '';
    this.categoryId = '';
    this.categoryError = '';

    this.video = '';
    this.videoError = '';
    this.videoSelected = false;
  }
}
