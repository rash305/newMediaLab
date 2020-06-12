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
export class ImageService {

  private handleError: HandleError;
  private imageUrl = environment.baseUrl + '/images';  // URL to web api

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('ImageService');
  }

  /** GET sign image from the server */
  getSignImage(imageNumber: number, signTitle: string, signCategory: string): Observable<string> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('imageNumber', String(imageNumber));
    httpParams = httpParams.append('signTitle', signTitle);
    httpParams = httpParams.append('signCategory', signCategory);

    return this.http.get<any>(this.imageUrl, {params: httpParams})
      .pipe(map(image => {
        return image.imageUrl;
      }))
        .pipe(
        catchError(this.handleError('getSignImage', null))
      );
  }
}
