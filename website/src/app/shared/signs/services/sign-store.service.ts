import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from '../../../common/network/http-error-handler.service';
import {Observable} from 'rxjs';
import {SignModel} from '../models/sign.model';
import {catchError} from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SignStoreService {
  private handleError: HandleError;
  signsUrl = environment.baseUrl + 'signs';  // URL to web api

  constructor( private http: HttpClient,
               httpErrorHandler: HttpErrorHandler,
               ) {
    this.handleError = httpErrorHandler.createHandleError('SignStoreService');
  }
  /** GET heroes from the server */
  getPersonalSigns(): Observable<SignModel[]> {
    return this.http.get<SignModel[]>(this.signsUrl)
      .pipe(
        catchError(this.handleError('getPersonalSigns', []))
      );
  }
}
