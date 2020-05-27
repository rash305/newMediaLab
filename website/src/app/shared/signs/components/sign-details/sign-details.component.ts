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

  isPersonalDictionary = false;
  isAddedToPersonal = false;
  purpleIcon = {
    color: '#444444'
  };

  @Input() currentSignId: string;
  @Input() sign: SignDetailsModel;
  likes = 30;
  isDeleted = false;

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
      });
  }

  addToPersonal() {
    this.purpleIcon = {
      color: '#593196'
    };
    this.likes += 1;
    this.isAddedToPersonal = !this.isAddedToPersonal;
    this.signDetailsService.favorite(this.sign).subscribe();
  }

  removeFromPersonal() {
    this.purpleIcon = {
      color: '#444444'
    };
    this.likes -= 1;
    this.isAddedToPersonal = !this.isAddedToPersonal;
  }

  delete() {
    // Do something in service to remove sign from favorites
    this.isDeleted = true;
  }
}
