import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {Account} from '../../../../shared/account/models/account';
import {AccountService} from '../../../../shared/account/services/account.service';
import {AuthenticationService} from '../../../../shared/account/services/authentication.service';

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.css', '../../settings-style.component.css']
})
export class LoginAccountComponent implements OnInit {

  username: string;
  usernameError: string;

  password: string;
  passwordError: string;

  incorrectLoginError: string;

  private requiredError = ' moet worden ingevuld';

  @Output() messageSettingsStatus = new EventEmitter<string>();

  constructor(private router: Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
  }

  logIn(): void {
    // All validation checks
    if ([this.validateUsername(this.username),
      this.validatePassword(this.password)].every(Boolean)) {

      // log in on api
      this.loginOnApi();
    }
  }

  validateUsername(username): boolean {
    if (!username) {
      this.usernameError = 'settings.login.error.username-email';
      return false;
    }

    this.usernameError = '';
    return true;
  }

  validatePassword(password): boolean {
    if (!password) {
      this.passwordError = 'settings.login.error.password';
      return false;
    }

    this.passwordError = '';
    return true;
  }

  private loginOnApi(): void {
    this.authService.login(this.username, this.password)
      .subscribe(accountId =>       {
        if (accountId)  {
          // log user in
          location.reload(true);
        } else {
          // Login failed
          // Toaster message is enough for now
          this.incorrectLoginError = 'settings.login.error.incorrect-login';
        }
      });
  }

  goBack(): void {
    this.messageSettingsStatus.emit('account');
  }

  toForgotPW() {
    this.messageSettingsStatus.emit('forgotPw');
  }
}
