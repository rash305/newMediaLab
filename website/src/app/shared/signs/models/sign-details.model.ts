import {ISignTemplate} from './isign-template';
import {SignDetailsComponent} from '../components/sign-details/sign-details.component';
import {SignModel} from './sign.model';
import {CategoryModel} from './category.model';
import {SafeHtml} from '@angular/platform-browser';
import {VideoModel} from './video.model';

export class SignDetailsModel extends SignModel {
  videos: VideoModel[] = [];
  image: string;

  constructor() {
    super();
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.category) {
      this.category = new CategoryModel().deserialize(input.category);
    }
    return this;
  }
}
