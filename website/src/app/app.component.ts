import {Component} from '@angular/core';
import {AuthenticationService} from './shared/account/services/authentication.service';
import {TranslateService} from '@ngx-translate/core';
import {ActivatedRoute} from '@angular/router';
import {CurrentLanguageService} from './shared/general/services/current-language.service';

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
  acceptedLanguages = ['nl', 'sw'];
  hideOnderzoeksPopup = false;

  constructor(authenticationService: AuthenticationService,
              private translate: TranslateService,
              private route: ActivatedRoute,
              private languageService: CurrentLanguageService) {
    translate.setDefaultLang(languageService.getLanguage());

    authenticationService.isLoggedInEmitter.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
      this.route.queryParams.subscribe(params => {
        const lang = params.lang;
        if (this.acceptedLanguages.find(x => x === lang)) {
          languageService.setLanguage(lang);
          translate.setDefaultLang(lang);
        }
      });
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
