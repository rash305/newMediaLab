import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-sign-of-day',
  templateUrl: './sign-of-day.component.html',
  styleUrls: ['./sign-of-day.component.css']
})
export class SignOfDayComponent implements OnInit {

  currentSignId: string;
  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.currentSignId = this.route.snapshot.paramMap.get('id');
  }

}
