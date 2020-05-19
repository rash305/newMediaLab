import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit {

  signOfDay: any;

  constructor() { }

  ngOnInit(): void {
    this.getSignOfDay();
  }

  getSignOfDay() {
    // get sign of the day from the sign service
    this.signOfDay = 'Gebaar van de dag';
  }

  toSignOfDay() {
    // Go to sign of the day page
  }

  toTest() {
    // Go to do a test
  }
}
