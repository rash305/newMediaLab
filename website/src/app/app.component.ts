import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'website';
  isLoggedIn = false;
  hideSettingsPopup = true;
  constructor() {
  }

  ShowSettingsPopup() {
    this.hideSettingsPopup = !this.hideSettingsPopup;
  }

  receiveLoginStatus($event: boolean) {
    this.isLoggedIn = $event;
  }

}
