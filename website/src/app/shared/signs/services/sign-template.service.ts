import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {SignModel} from '../models/sign.model';
import {SignTemplateStoreService} from './backendCommunication/sign-template-store.service';
import {catchError, map} from 'rxjs/operators';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {HandleError, HttpErrorHandler} from '../../../common/network/http-error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class SignTemplateService {
  private handleError: HandleError;

  private numberOfDownloadedSigns = 0;
  // tslint:disable-next-line:variable-name
  private _personalSigns: BehaviorSubject<SignModel[]> = new BehaviorSubject([]);
  // tslint:disable-next-line:variable-name
  private _publicSigns: BehaviorSubject<SignModel[]> = new BehaviorSubject([]);
  public readonly personalSigns: Observable<SignModel[]> = this._personalSigns.asObservable();
  public readonly publicSigns: Observable<SignModel[]> = this._publicSigns.asObservable();

  constructor(private signBackendService: SignTemplateStoreService,
              private http: HttpClient,
              httpErrorHandler: HttpErrorHandler) {
    this.loadInitialData();
    this.handleError = httpErrorHandler.createHandleError('SignStoreService');
  }

  private loadInitialData() {
    this.signBackendService.getSigns(null)
      .subscribe(
        res => {
          const signModels = (res.map((jsonSign: any) =>
            new SignModel().deserialize(jsonSign)));

          this._publicSigns.next(signModels);
        },
        err => console.log('Error retrieving personal signs')
      );
  }

  loadNextBatchSigns(category: string, isPersonal = false) {
    const promise = new Promise((resolve, reject) => {
      // Get signs from backend
      if (isPersonal) {
        this.signBackendService.getPersonalSigns(category).subscribe(result => resolve(this.signsResult(result, true)));
      } else {
        this.signBackendService.getSigns(category).subscribe(result => resolve(this.signsResult(result)));
      }
    });

    return promise;
  }

  getSearchedSigns(searchTerm): Observable<SignModel[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('searchTerm', searchTerm);
    const signsUrl = environment.baseUrl + '/signs/search';  // URL to web api

    return this.http.get<object[]>(signsUrl, {params: httpParams})
      .pipe(map(res => res.map(signData => new SignModel()
        .deserialize(signData))
        .sort((a, b) => a.title.localeCompare(b.title))))
      .pipe(
        catchError(this.handleError('getSearchedSignList', []))
      );
  }

  signsResult(result: any, personal = false): number {
    let addedSigns = 0;
    let signList;
    if (personal) {
      // Get signList as current list of signs
      signList = this._personalSigns.getValue();
    } else {
      signList = this._publicSigns.getValue();
    }
    const retrievedSigns = result as SignModel[];
    // Create list with all retrieved signs
    // This approach is not thread safe unfortunately, I should investigate if this is a problem in javascript..
    retrievedSigns.forEach(x => {
      if (signList.findIndex(index => index.id === x.id) === -1) {
        signList.push(x);
        addedSigns++;
      }
    });

    // Sort signs
    signList.sort((a, b) => a.title.localeCompare(b.title));


    if (personal) {
      // Set signList as current list of signs
      this._personalSigns.next(signList);
    } else {
      this._publicSigns.next(signList);
    }

    // Notify how many signs are added
    return addedSigns;
  }

  AddSignManually(sign: SignModel) {
    const personalSigns = this._personalSigns.getValue();
    personalSigns.push(sign);
    // Sort signs alphabetically
    personalSigns.sort((a, b) => a.title.localeCompare(b.title));
    this._personalSigns.next(personalSigns);

    const publicSigns = this._publicSigns.getValue();
    publicSigns.push(sign);
    // Sort signs alphabetically
    publicSigns.sort((a, b) => a.title.localeCompare(b.title));
    this._publicSigns.next(publicSigns);
  }
}

