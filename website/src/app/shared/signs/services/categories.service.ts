import { Injectable } from '@angular/core';
import {HandleError, HttpErrorHandler} from '../../../common/network/http-error-handler.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {CategoryModel} from '../models/category.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private handleError: HandleError;
  categoryUrl = 'api/categories';  // URL to web api

  constructor( private http: HttpClient,
               httpErrorHandler: HttpErrorHandler,
  ) {
    this.handleError = httpErrorHandler.createHandleError('CategoriesService');
  }

  /** GET heroes from the server */
  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(this.categoryUrl)
      .pipe(
        catchError(this.handleError('getCategories', null))
      );
  }

  /** GET heroes from the server */
  getPersonalCategories(): Observable<CategoryModel[]> {
    // Todo: Add user guid in the body to filter categories
    // Todo: User guid might be added by a guard or something -> investigate later
    return this.http.get<CategoryModel[]>(this.categoryUrl)
      .pipe(
        catchError(this.handleError('getPersonalCategories', null))
      );
  }
}
