import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from '../../../common/network/http-error-handler.service';
import {environment} from '../../../../environments/environment';
import {SignModel} from '../models/sign.model';

@Injectable({
  providedIn: 'root'
})
export class SignOfDayService {

  private handleError: HandleError;
  signOfDayUrl = environment.baseUrl + '/signs/sign-of-day';  // URL to web api

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('SignDetailsService');
  }

  getSignOfDay(): Observable<SignModel> {
    return this.http.get<any[]>(this.signOfDayUrl)
      .pipe(map(res => new SignModel().deserialize(res)))
      .pipe(
        catchError(this.handleError('getSignOfDay', null))
      );
  }
}
