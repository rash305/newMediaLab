import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.css']
})
export class SettingsPopupComponent implements OnInit {
  isLoggedIn = false;

  constructor() { }

  ngOnInit(): void {
  }

  receiveLoginStatus($event: boolean) {
    this.isLoggedIn = $event;
  }
}
