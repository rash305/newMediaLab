import {Injectable} from '@angular/core';
import {BehaviorSubject, observable, Observable, Subject} from 'rxjs';
import {SignModel} from '../models/sign.model';
import {SignTemplateStoreService} from './backendCommunication/sign-template-store.service';
import {CategoryModel} from '../models/category.model';
import {any} from 'codelyzer/util/function';

@Injectable({
  providedIn: 'root'
})
export class SignTemplateService {
  private numberOfDownloadedSigns = 0;
  // tslint:disable-next-line:variable-name
  private _personalSigns: BehaviorSubject<SignModel[]> = new BehaviorSubject([]);
  // tslint:disable-next-line:variable-name
  private _publicSigns: BehaviorSubject<SignModel[]> = new BehaviorSubject([]);
  public readonly personalSigns: Observable<SignModel[]> = this._personalSigns.asObservable();
  public readonly publicSigns: Observable<SignModel[]> = this._publicSigns.asObservable();

  constructor(private signBackendService: SignTemplateStoreService) {
    this.loadInitialData();
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

  signsResult(result: any, personal = false): number {
    let addedSigns = 0;
    const signList = this._personalSigns.getValue();
    const retrievedSigns = result as SignModel[];
    // Create list with all retrieved signs
    // This approach is not thread safe unfortunately, I should investigate if this is a problem in javascript..
    retrievedSigns.forEach(x => {
      if (signList.findIndex(index => index.id === x.id) === -1) {
        signList.push(x);
        addedSigns++;
      }
    });

    if (personal) {
      // Set signList as current list of signs
      this._personalSigns.next(signList);
    } else {
      this._publicSigns.next(signList);
    }


    // Notify how many signs are added
    return addedSigns;
  }

  public AddSignManually(sign: SignModel) {
    const personalSigns = this._personalSigns.getValue();
    personalSigns.push(sign);
    this._personalSigns.next(personalSigns);

    const publicSigns = this._publicSigns.getValue();
    personalSigns.push(sign);
    this._publicSigns.next(publicSigns);
  }
}

