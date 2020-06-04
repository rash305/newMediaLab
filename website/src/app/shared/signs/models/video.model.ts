import {SafeHtml} from '@angular/platform-browser';

export class VideoModel {
  public videoUrl;
  public popularity: number;

  constructor(videoUrl: string) {
    this.videoUrl = videoUrl;
  }
}
