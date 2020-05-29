import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {CategoryModel} from '../../signs/models/category.model';
import {catchError, map} from 'rxjs/operators';
import {LearnSubTask} from '../models/learn-sub-task';
import {HttpClient, HttpParams} from '@angular/common/http';
import {HandleError, HttpErrorHandler} from '../../../common/network/http-error-handler.service';
import {environment} from '../../../../environments/environment';
import {LearnTask} from '../models/learn-task';
import {SignDetailsModel} from '../../signs/models/sign-details.model';

@Injectable({
  providedIn: 'root'
})
export class LearnTaskService {

  private handleError: HandleError;
  private learnTaskUrl = environment.baseUrl + '/learntasks';  // URL to web api

  constructor(private http: HttpClient,
              httpErrorHandler: HttpErrorHandler) {
    this.handleError = httpErrorHandler.createHandleError('LearnTaskService');

  }

  getLearnTask(): Observable<LearnTask> {
    return this.http.get<any[]>(this.learnTaskUrl)
      .pipe(map(learnTask => new LearnTask().deserialize(learnTask)))
//      .pipe(map(res => res.map(learnTask => new LearnTask().deserialize(learnTask))))
      .pipe(
        catchError(this.handleError('getLearnTasks', null))
      );
  }

  /** GET sub tasks from the server */
  getLearnSubTask(subtasksId: string): Observable<LearnSubTask[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('ids', subtasksId);

    return this.http.get<any[]>(this.learnTaskUrl + '/sub/' + subtasksId)
      .pipe(map(res => res.map(learnTask => new LearnSubTask().deserialize(learnTask))))
      .pipe(
        catchError(this.handleError('getLearnTasks', null))
      );
  }
}
