import {Pipe, PipeTransform} from '@angular/core';
import {DomSanitizer, SafeHtml, SafeResourceUrl, SafeScript, SafeStyle, SafeUrl} from '@angular/platform-browser';

@Pipe({
  name: 'domSanitizer'
})
export class DomSanitizerPipe implements PipeTransform {

  constructor(protected sanitizer: DomSanitizer) {
  }

  public transform(value: any, type: string): SafeHtml | SafeStyle | SafeScript | SafeUrl | SafeResourceUrl {
    switch (type) {
      case 'html':
        return this.sanitizer.bypassSecurityTrustHtml(value);
      case 'style':
        return this.sanitizer.bypassSecurityTrustStyle(value);
      case 'script':
        return this.sanitizer.bypassSecurityTrustScript(value);
      case 'url':
        return this.sanitizer.bypassSecurityTrustUrl(value);
      case 'resourceUrl':
        return this.sanitizer.bypassSecurityTrustResourceUrl(value);
      case 'VideoSource':
        const videoUrl =  URL.createObjectURL(value);
        return this.sanitizer.bypassSecurityTrustResourceUrl(videoUrl);
      default:
        throw new Error(`Invalid safe type specified: ${type}`);
    }
  }
}
