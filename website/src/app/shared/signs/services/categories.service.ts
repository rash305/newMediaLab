import {Injectable} from '@angular/core';
import {HandleError, HttpErrorHandler} from '../../../common/network/http-error-handler.service';
import {Observable, pipe} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {CategoryModel} from '../models/category.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  private handleError: HandleError;
  private categoryUrl = environment.baseUrl + '/categories';  // URL to web api

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('CategoriesService');
  }

  /** GET categories from the server */
  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<any[]>(this.categoryUrl)
      .pipe(map(res => res.map(categoryData => new CategoryModel()
        .deserialize(categoryData))
        .sort((a, b) => a.title.localeCompare(b.title))))
      .pipe(
        catchError(this.handleError('getCategories', null))
      );
  }

  /** GET personal categories from the server */
  getPersonalCategories(): Observable<CategoryModel[]> {
    // Todo: Add user guid in the body to filter categories
    // Todo: User guid might be added by a guard or something -> investigate later
    return this.http.get<CategoryModel[]>(this.categoryUrl, {params: new HttpParams().set('personal', 'true')})
      .pipe(map(res => res.map(categoryData => new CategoryModel()
        .deserialize(categoryData))
        .sort((a, b) => a.title.localeCompare(b.title))))
      .pipe(
        catchError(this.handleError('getPersonalCategories', null))
      );
  }
}
