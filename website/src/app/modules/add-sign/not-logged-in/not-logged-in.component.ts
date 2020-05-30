import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-not-logged-in',
  templateUrl: './not-logged-in.component.html',
  styleUrls: ['./not-logged-in.component.css']
})
export class NotLoggedInComponent implements OnInit {

  @Output() NotLoggedInMinimalizeEvent = new EventEmitter();
  @Output() GoToSettingsEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.NotLoggedInMinimalizeEvent.emit(true);
  }

  toSettings() {
    this.NotLoggedInMinimalizeEvent.emit(true);
    this.GoToSettingsEvent.emit(true);
  }
}
