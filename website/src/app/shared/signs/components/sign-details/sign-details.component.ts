import {Component, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SignDetailsService} from '../../services/sign-details.service';
import {SignDetailsModel} from '../../models/sign-details.model';
import {EventEmitter} from '@angular/core';
import {CategoryModel} from '../../models/category.model';

@Component({
  selector: 'app-sign-details',
  templateUrl: './sign-details.component.html',
  styleUrls: ['./sign-details.component.css']
})
export class SignDetailsComponent implements OnInit {


  @Output() parentId = new EventEmitter();

  @Input() isPersonalDictionary: boolean;

  @Input() currentSignId: string;
  @Input() sign: SignDetailsModel;

  isDeleted = false;
  hideDeletePopup = true;

  constructor(private route: ActivatedRoute,
              private signDetailsService: SignDetailsService) {
  }

  ngOnInit(): void {
    // Retrieve the parameter value of the parameter defined in the route in app.module.ts
    // this.currentSignId = this.route.snapshot.paramMap.get('id');
    // Get details of sign
    this.getSign();
  }

  getSign(): void {
    this.signDetailsService.getSignDetails(this.currentSignId)
      .subscribe(data => {
        if (data) {
          this.sign = data;
          this.parentId.emit(data.category);
        }
        console.log('Marit print de sign details', this.sign);
      });
  }

  addToPersonal() {
    this.sign.nrOfPersonal += 1;
    this.sign.isPersonal = !this.sign.isPersonal;
    this.signDetailsService.favorite(this.sign).subscribe();
  }

  removeFromPersonal() {
    this.sign.nrOfPersonal -= 1;
    this.sign.isPersonal = !this.sign.isPersonal;
    this.signDetailsService.unFavorite(this.sign).subscribe();
  }

  delete() {
    this.hideDeletePopup = !this.hideDeletePopup;
    // Open popup to confirm deleting
  }
}
