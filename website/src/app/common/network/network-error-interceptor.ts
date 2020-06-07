import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import {Observable, of, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';
import {AuthenticationService} from '../../shared/account/services/authentication.service';
import {MessagesService} from '../errors/messages.service';


@Injectable()
export class NetworkErrorInterceptor implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService,
              private messageService: MessagesService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        // auto logout if 401 response returned from api
        this.authenticationService.logout();
        this.messageService.add(`Inloggen is mislukt`);

      }

      const error = err.error?.message || err.statusText;
      return throwError(error);
    }));
  }
}
