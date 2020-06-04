import {Injectable} from '@angular/core';
import {HandleError, HttpErrorHandler} from '../../../common/network/http-error-handler.service';
import {catchError, map} from 'rxjs/operators';
import {CategoryModel} from '../models/category.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {SignDetailsModel} from '../models/sign-details.model';
import {Observable, of} from 'rxjs';
import {Account} from '../../account/models/account';
import {SignModel} from '../models/sign.model';
import {FileItem, FileUploader} from 'ng2-file-upload';
import {VideoModel} from '../models/video.model';
import {MessagesService} from '../../../common/errors/messages.service';

@Injectable({
  providedIn: 'root'
})

export class SignDetailsService {

  private handleError: HandleError;
  signDetailsUrl = environment.baseUrl + '/signdetails/';  // URL to web api
  signVideoUrl = environment.baseUrl + '/videos';  // URL to web api
  signUrl = environment.baseUrl + '/signs';  // URL to web api

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandler,
              private messageService: MessagesService) {
    this.handleError = httpErrorHandler.createHandleError('SignDetailsService');
  }

  getSignDetails(id: string): Observable<SignDetailsModel> {
    const detailsUrl = this.signDetailsUrl + id;
    return this.http.get<any[]>(detailsUrl)
      .pipe(map(res => new SignDetailsModel().deserialize(res)))
      .pipe(
        catchError(this.handleError('getSignDetails', null))
      );
  }

  /** Add sign to database */
  addSign(signDetails: SignDetailsModel, signVideo: FileItem): Observable<SignDetailsModel> {
    return new Observable(observer => {
      const uploader = this.getFileUploader();
      this.messageService.add(`Upload started`);

      uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        // Check for true result
        if (status === 0) {
          observer.error();
          this.messageService.add(response);
        } else {
          // Insert video url
          this.messageService.add(`VIdeo uploaded` + response);
          signDetails.videos = [new VideoModel(response)];
          this.http.post<SignDetailsModel>(this.signDetailsUrl, signDetails)
            .pipe(map(res => {
              return new SignDetailsModel().deserialize(res);
            }))
            .pipe(
              catchError(this.handleError('createSignDetails', null))
            ).subscribe(x => {
            observer.next(x);
            observer.complete();
            this.messageService.add(`Upload finished` + x);
          });
        }
      };
      uploader.addToQueue([signVideo._file]);
    });
  }

  private getFileUploader(): FileUploader {
    const currentJWT = localStorage.getItem('currentUserBearer');
    const uploader = new FileUploader({
      url: this.signVideoUrl,
      disableMultipart: false,
      autoUpload: true,
      method: 'post',
      itemAlias: 'file',
      authToken: currentJWT
    });
    uploader.onBeforeUploadItem = (item) => {
      item.withCredentials = false;
    };

    return uploader;
  }

  favorite(sign: SignDetailsModel): Observable<boolean> {
    return this.http.post<SignDetailsModel>(this.signUrl + '/favorite', sign)
      .pipe(map(x => {
          return true;
        })
      )
      .pipe(
        catchError(this.handleError('favoriteSign', null))
      );
  }

  unFavorite(sign: SignDetailsModel): Observable<boolean> {
    return this.http.post<SignDetailsModel>(this.signUrl + '/unfavorite', sign)
      .pipe(map(x => {
          return true;
        })
      )
      .pipe(
        catchError(this.handleError('unFavoriteSign', null))
      );
  }
}
