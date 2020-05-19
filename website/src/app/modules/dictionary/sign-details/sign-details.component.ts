import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SignDetailsService} from '../../../shared/signs/services/sign-details.service';
import {SignDetailsModel} from '../../../shared/signs/models/sign-details.model';

@Component({
  selector: 'app-sign-details',
  templateUrl: './sign-details.component.html',
  styleUrls: ['./sign-details.component.css']
})
export class SignDetailsComponent implements OnInit {

  sign: SignDetailsModel;

  constructor(
    private signDetailsService: SignDetailsService,
  ) {
  }

  ngOnInit(): void {
  this.getSign();
  console.log(this.sign);
  }

  getSign(): void {
    this.signDetailsService.getSignDetails('this_is_an_id')
      .subscribe(data => {
        this.sign = data;
      });

  }

}