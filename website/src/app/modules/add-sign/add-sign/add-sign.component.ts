import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {CategoryModel} from '../../../shared/signs/models/category.model';
import {CategoriesService} from '../../../shared/signs/services/categories.service';
import {SignDetailsModel} from '../../../shared/signs/models/sign-details.model';
import {SignDetailsService} from '../../../shared/signs/services/sign-details.service';
import {SignTemplateService} from '../../../shared/signs/services/sign-template.service';
import {FileItem} from 'ng2-file-upload';
import {ImageService} from '../../../shared/signs/services/image.service';

@Component({
  selector: 'app-add-sign',
  templateUrl: './add-sign.component.html',
  styleUrls: ['./add-sign.component.css']
})
export class AddSignComponent implements OnInit {

  uploadingData = true;
  meaning: string;
  meaningError: string;
  categoryId = '';
  categoryError: string;

  video: FileItem;
  videoError: string;

  private requiredError = ' moet worden ingevuld';

  showConfirmationScreen = false;
  imageNumber = 1;
  sign: SignDetailsModel;

  categories: CategoryModel[];

  @Output() AddSignMinimalizeEvent = new EventEmitter();

  constructor(private router: Router,
              private categoriesService: CategoriesService,
              private signDetailsService: SignDetailsService,
              private signService: SignTemplateService,
              private imageService: ImageService) {
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
      const signDetails = new SignDetailsModel().deserialize({
        title: this.meaning, categoryId: this.categoryId,
        category: categoryModel, image: null
      });
      // Go to confirmation screen for user to confirm sign
      this.sign = signDetails;
      this.showConfirmationScreen = true;

      // Send object to backend API
      this.imageService.getSignImage(this.imageNumber, this.meaning, categoryModel.title)
        .subscribe(image => {
          const signImage = image;
          signDetails.image = image;
          this.uploadingData = false;
        });
    }
  }

  changeImage(change: boolean): void {
    this.uploadingData = true;
    if (change) {
      this.imageNumber = this.imageNumber + 1;
      this.imageService.getSignImage(this.imageNumber, this.sign.title, this.sign.category.title)
        .subscribe(image => {
          this.sign.image = image;
          this.uploadingData = false;

          if (!image) {
            // Second try
            this.imageNumber = 1;
            this.imageService.getSignImage(this.imageNumber, this.sign.title, this.sign.category.title)
              .subscribe(image2 => {
                this.sign.image = image2;
              });
          }
        });
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
    // Add sign to api
    this.uploadingData = true;
    this.signDetailsService.addSign(signDetails, this.video).subscribe(sign => {
      this.uploadingData = false;

      if (sign === null) {
        // Failed to add sign
        // Toaster message is enough for now
      } else {
        // Make uploaded sign favorite
        this.signDetailsService.favorite(sign, sign.videos.pop()).subscribe();
        // Add signs to web sign service
        // this.signService.AddSignManually(sign);
        this.emptyVariables();
        console.log(sign);
        this.routeAfterUpdate(sign.id);
        this.showConfirmationScreen = false;
        this.AddSignMinimalizeEvent.emit(true);
      }
    });
  }

  goBack(): void {
    this.AddSignMinimalizeEvent.emit(true);
  }


  confirm($event: string) {
    if ($event === 'confirmed') {
      // Sign is accepted, thus add sign to app and close popup
      this.addSignToApp(this.sign);
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

    this.video = null;
    this.videoError = '';
  }

  videoErrorFunction($event: any) {
    this.video = null;
    this.videoError = 'Dit video formaat kan niet worden afgespeeld.';
  }

  routeAfterUpdate(id) {
    this.router.navigate(['/learn']);
    this.router.navigate(['/dictionary'], {
      queryParams: {id, type: 'sign-details'},
      queryParamsHandling: 'merge',
      // preserve the existing query params in the route
      skipLocationChange: false
      // do not trigger navigation
    });
  }
}
