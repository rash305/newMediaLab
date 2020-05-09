import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryModel} from '../../signs/models/category.model';
import {catchError} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from '../../../common/network/http-error-handler.service';
import {environment} from '../../../../environments/environment';
import {Account} from '../models/account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private handleError: HandleError;
  accountsUrl = environment.baseUrl + '/accounts';  // URL to web api
  accountValidationUrl = environment.baseUrl + '/validation/account/';  // URL to web api

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('AccountService');
  }

  /** Create account ons server */
  createAccount(account: Account): Observable<string> {
    return this.http.post<Account>(this.accountsUrl, account)
      .pipe(
        catchError(this.handleError('createAccount', null))
      );
  }

  checkEmailAvailability(email: Observable<boolean>) {
    return this.http.post<boolean>(this.accountValidationUrl + 'email', email)
      .pipe(
        catchError(this.handleError('checkEmailAvailability', false))
      );
  }

  checkUsernameAvailability(username: Observable<boolean>) {
    return this.http.post<boolean>(this.accountValidationUrl + 'username', username)
      .pipe(
        catchError(this.handleError('checkUsernameAvailability', false))
      );
  }
}
