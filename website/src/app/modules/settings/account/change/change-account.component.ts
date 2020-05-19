import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-change-account',
  templateUrl: './change-account.component.html',
  styleUrls: ['./change-account.component.css', '../../settings-style.component.css']
})
export class ChangeAccountComponent implements OnInit {

  username: string;
  usernameError: string;
  emailAddress: string;
  emailError: string;

  oldPassword: string;
  oldPasswordError: string;
  newPassword: string;
  newPasswordError: string;
  newPassword2: string;

  private requiredError = ' moet worden ingevuld';

  @Output() messageSettingsStatus = new EventEmitter<string>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  saveChanges(): void {
    // All validation checks
    if ([ // this.validateUsername(this.username),
      // this.validateEmail(this.emailAddress),
      this.validateOldPassword(this.oldPassword),
      this.validateNewPassword(this.newPassword, this.newPassword2)].every(Boolean)) {

      // Send object to backend API
      this.doSomethingInService();

      // Go to account page (and have changes saved)
      this.messageSettingsStatus.emit('account');
    }
  }

  validateUsername(username): boolean {
    if (!username) {
      this.usernameError = 'Gebruikersnaam' + this.requiredError;
      return false;
    }
    if (username.length < 5) {
      this.usernameError = 'Gebruikersnaam moet minimaal 5 tekens bevatten';
      return false;
    }

    this.usernameError = '';
    return true;
  }

  validateEmail(email): boolean {
    if (!email) {
      this.emailError = 'E-mailadres' + this.requiredError;
      return false;
    }

    if (email.length < 1) {
      this.emailError = 'E-mailadres is te kort';
      return false;
    }

    if (!this.validateEmailRegex(email)) {
      this.emailError = 'E-mailadres heeft het verkeerde opbouw';
      return false;
    }

    this.emailError = '';
    return true;
  }

  validateEmailRegex(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validateOldPassword(password): boolean {
    if (!password) {
      this.oldPasswordError = 'Huidig wachtwoord' + this.requiredError;
      return false;
    }

    // Check in service if password is correct
    if (password.includes('a')) {
      this.oldPasswordError = 'Huidig wachtwoord is incorrect';
      return false;
    }

    this.oldPasswordError = '';
    return true;
  }

  validatePasswordRegex(password): boolean {
    // tslint:disable-next-line:max-line-length
    const re = new RegExp('^(?=.*[!@#$%^&*])');
    return re.test(String(password));
  }

  validateNewPassword(password, password2): boolean {
    if (!password || !password2) {
      this.newPasswordError = 'Nieuw wachtwoord' + this.requiredError;
      return false;
    }

    if (password.length < 8) {
      this.newPasswordError = 'Nieuw wachtwoord moet minimaal 8 tekens bevatten';
      return false;
    }

    if (!this.validatePasswordRegex(password)) {
      this.newPasswordError = 'Nieuw wachtwoord moet tenminste 1 speciaal teken bevatten';
      return false;
    }

    if (!(password === password2)) {
      this.newPasswordError = 'Wachtwoorden moeten overeenkomen';
      return false;
    }

    this.newPasswordError = '';
    return true;
  }

  private doSomethingInService(): void {

  }

  goBack(): void {
    this.messageSettingsStatus.emit('account');
  }
}
