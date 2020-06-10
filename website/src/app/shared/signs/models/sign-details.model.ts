import {ISignTemplate} from './isign-template';
import {SignDetailsComponent} from '../components/sign-details/sign-details.component';
import {SignModel} from './sign.model';
import {CategoryModel} from './category.model';
import {SafeHtml} from '@angular/platform-browser';
import {VideoModel} from './video.model';

export class SignDetailsModel extends SignModel {
  videos: VideoModel[] = [];
  image: string;
  isPersonal: boolean;
  nrOfPersonal: number;

  constructor() {
    super();
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    if (input.category) {
      this.category = new CategoryModel().deserialize(input.category);
    }
    if (input.videos) {
      this.videos = input.videos.map(vid => new VideoModel().deserialize(vid));
    }
    return this;
  }
}
