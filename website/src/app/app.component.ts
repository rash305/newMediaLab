import {Component} from '@angular/core';
import {AuthenticationService} from './shared/account/services/authentication.service';
import {TranslateService} from '@ngx-translate/core';

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

  constructor(authenticationService: AuthenticationService,
              private translate: TranslateService) {
    authenticationService.isLoggedInEmitter.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      translate.setDefaultLang('en');

    });
    authenticationService.isLoggedIn();
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
