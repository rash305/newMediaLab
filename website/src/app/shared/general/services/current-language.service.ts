import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentLanguageService {

  constructor() {
  }

  getLanguage(): string {
    let lang = localStorage.getItem('lang');

    if (!lang) {
      lang = 'en';
    }
    return lang;
  }

  setLanguage(lang: string) {
    localStorage.setItem('lang', lang);
  }
}
