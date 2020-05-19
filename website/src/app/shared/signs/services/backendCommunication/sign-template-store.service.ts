import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from '../../../../common/network/http-error-handler.service';
import {environment} from '../../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SignModel} from '../../models/sign.model';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SignTemplateStoreService {
  private handleError: HandleError;
  signsUrl = environment.baseUrl + '/signs';  // URL to web api

  constructor( private http: HttpClient,
               httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = httpErrorHandler.createHandleError('SignStoreService');
  }
  /** GET signs from the server */
  getPersonalSigns(): Observable<object[]> {
    return this.http.get<object[]>(this.signsUrl)
      .pipe(
        catchError(this.handleError('getPersonalSigns', []))
      );
  }
}
