import {SafeHtml} from '@angular/platform-browser';

export class VideoModel {
  videoUrl;
  popularity: number;

  constructor(videoUrl: string) {
    this.videoUrl = videoUrl;
  }
}
