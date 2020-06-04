import {Component, OnInit} from '@angular/core';
import {SignModel} from '../../shared/signs/models/sign.model';
import {SignOfDayService} from '../../shared/signs/services/sign-of-day.service';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {

  signOfDay: SignModel;

  constructor(private signOfDayService: SignOfDayService) {
  }

  ngOnInit(): void {
    this.getSignOfDay();
  }

  getSignOfDay() {
    // get sign of the day from the sign service
    // let signs: SignModel[];
    // this.signService.publicSigns.subscribe(s => {
    //   signs = s;
    //   const index = Math.floor(Math.random() * signs.length);
    //   this.signOfDay = signs[index];
    // });
    // this.signService.loadNextBatchSigns(null);
    this.signOfDayService.getSignOfDay()
      .subscribe(signOfDay => {
        this.signOfDay = signOfDay;
      });
  }
}
