import {Injectable} from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with basic auth credentials if available
    let language = localStorage.getItem('lang');

    if (language === null) {
      language = 'en';
    }
    request = request.clone({
      setHeaders: {
        'Accept-Language': `${language}`
      }
    });
    return next.handle(request);
  }
}
