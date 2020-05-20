import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from '../../../common/network/http-error-handler.service';
import {catchError} from 'rxjs/operators';
import {CategoryModel} from '../models/category.model';
import {HttpClient} from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import {SignDetailsModel} from '../models/sign-details.model';
import { Observable, of } from 'rxjs';
import {Account} from '../../account/models/account';

@Injectable({
  providedIn: 'root'
})
export class SignDetailsService {

  private handleError: HandleError;
  signsUrl = environment.baseUrl + '/signs/details/';  // URL to web api

  constructor( private http: HttpClient,
               httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = httpErrorHandler.createHandleError('SignDetailsService');
  }

  /** GET heroes from the server */
  getSignDetails2(id: string): Observable<SignDetailsModel> {
    const model  = new SignDetailsModel('5ec2fee0136b986d2a531100', 'Konijn', '5eb5ebeb0c57e73817dbfb1a'  );
    model.id = '5ec2fee0136b986d2a531100';
    model.image = 'https://w.wallhaven.cc/full/2e/wallhaven-2evglg.jpg';
    model.video = 'unknown';
    model.category = 'Dieren';
    return of(model);

  }

  getSignDetails(id: string): Observable<SignDetailsModel> {
    return this.http.get<any[]>(this.signsUrl)
      .pipe(
        catchError(this.handleError('getSign', null))
      );
  }

  /** Add sign to database */
  addSign(signDetail: SignDetailsModel) {

  }
}
