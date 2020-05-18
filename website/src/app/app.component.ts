import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'website';
  isLoggedIn = true;
  hideSettingsPopup = true;
  hideAddSignPopup = true;
  hideNotLoggedInPopup = true;

  constructor() {
  }

  ShowSettingsPopup() {
    this.hideSettingsPopup = !this.hideSettingsPopup;
  }

  ShowAddSignPopup() {
    this.hideAddSignPopup = !this.hideAddSignPopup;
  }

  ShowNotLoggedInPopup() {
    this.hideNotLoggedInPopup = !this.hideNotLoggedInPopup;
  }

  receiveLoginStatus($event: boolean) {
    this.isLoggedIn = $event;
  }

}
