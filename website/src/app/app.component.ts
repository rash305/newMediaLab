import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'website';
  isLoggedIn = false;
  createAccountIsTrue = false;
  constructor() {
  }

  showCreateAccountPopup() {
    this.createAccountIsTrue = !this.createAccountIsTrue;
  }

  receiveLoginStatus($event: boolean) {
    this.isLoggedIn = $event;
  }

}
