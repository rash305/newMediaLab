import {Injectable} from '@angular/core';
import {BehaviorSubject, observable, Observable, Subject} from 'rxjs';
import {SignModel} from '../models/sign.model';
import {SignTemplateStoreService} from './backendCommunication/sign-template-store.service';

@Injectable({
  providedIn: 'root'
})
export class SignTemplateService {
  private numberOfDownloadedSigns = 0;
  // tslint:disable-next-line:variable-name
  private _personalSigns: BehaviorSubject<SignModel[]> = new BehaviorSubject([]);
  public readonly personalSigns: Observable<SignModel[]> = this._personalSigns.asObservable();

  constructor(private todoBackendService: SignTemplateStoreService) {
    this.loadInitialData();
  }

  private loadInitialData() {
    this.todoBackendService.getPersonalSigns()
      .subscribe(
        res => {
          const signModels = (res.map((jsonSign: any) =>
            new SignModel(jsonSign.id, jsonSign.title, jsonSign.categoryId)));

          this._personalSigns.next(signModels);
        },
        err => console.log('Error retrieving personal signs')
      );
  }

  loadNextBatchPersonalSigns(category: string) {
    const promise = new Promise((resolve, reject) => {
      let addedSigns = 0;
      // Get signs from backend
      this.todoBackendService.getPersonalSigns().subscribe(result => {
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

        // Set signList as current list of signs
        this._personalSigns.next(signList);

        // Notify how many signs are added
        resolve(addedSigns);
      });
    });
    return promise;
  }
}
