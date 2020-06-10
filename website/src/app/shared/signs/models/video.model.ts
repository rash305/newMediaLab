import {SafeHtml} from '@angular/platform-browser';
import {CategoryModel} from './category.model';

export class VideoModel {
  public videoUrl;
  public type;
  public popularity: number;

  constructor() {
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

  getUrl(): string {
    return this.videoUrl + '?type=' + this.type;
  }
}
