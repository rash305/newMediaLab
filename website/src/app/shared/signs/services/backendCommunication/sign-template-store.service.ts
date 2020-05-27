import {Injectable} from '@angular/core';
import {HandleError, HttpErrorHandler} from '../../../../common/network/http-error-handler.service';
import {environment} from '../../../../../environments/environment';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SignModel} from '../../models/sign.model';
import {catchError, map} from 'rxjs/operators';
import {CategoryModel} from '../../models/category.model';

@Injectable({
  providedIn: 'root'
})
export class SignTemplateStoreService {
  private handleError: HandleError;
  signsUrl = environment.baseUrl + '/signs';  // URL to web api

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = httpErrorHandler.createHandleError('SignStoreService');
  }

  /** GET signs from the server */
  getSigns(category): Observable<object[]> {
    let httpParams = new HttpParams();
    if (category) {
      httpParams = httpParams.append('category', category);
    }
    return this.http.get<object[]>(this.signsUrl, {params: httpParams})
      .pipe(map(res => res.map(signData => new SignModel().deserialize(signData))))
      .pipe(
        catchError(this.handleError('getSigns', []))
      );
  }

  /** GET signs from the server */
  getPersonalSigns(category): Observable<object[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('category', category);
    httpParams = httpParams.append('personal', 'true');

    return this.http.get<object[]>(this.signsUrl, {params: httpParams})
      .pipe(map(res => res.map(signData => new SignModel().deserialize(signData))))
      .pipe(
        catchError(this.handleError('getPersonalSigns', []))
      );
  }
}
