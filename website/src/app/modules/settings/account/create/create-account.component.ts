import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css', '../account.component.css']
})
export class CreateAccountComponent implements OnInit {

  username: string;
  usernameError: string;
  emailAddress: string;
  emailError: string;

  password: string;
  passwordError: string;
  password2: string;
  password2Error: string;

  private requiredError = ' moet worden ingevuld';

  @Output() messageLoginStatus = new EventEmitter<boolean>();

  constructor(private router: Router,
              private location: Location) { }

  ngOnInit(): void {
  }

  createAccount(): void {
    // All validation checks
    if ([this.validateUsername(this.username),
        this.validateEmail(this.emailAddress),
        this.validatePassword(this.password),
        this.validatePassword2(this.password2, this.password)].every(Boolean)) {
      // Send object to backend API
      this.doSomethingInService();

      // send message that you are logged in to activate camera
      this.messageLoginStatus.emit(true);
      // Go to categories page (and be logged in)
      this.router.navigate(['/categories']);
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

  validatePassword(password): boolean {
    if (!password) {
      this.passwordError = 'Wachtwoord' + this.requiredError;
      return false;
    }

    if (password.length < 8) {
      this.passwordError = 'Wachtwoord moet minimaal 8 tekens bevatten';
      return false;
    }

    if (!this.validatePasswordRegex(password)) {
      this.passwordError = 'Wachtwoord moet tenminste 1 speciaal teken bevatten';
      return false;
    }

    this.passwordError = '';
    return true;
  }

  validatePasswordRegex(password): boolean {
    // tslint:disable-next-line:max-line-length
    const re = new RegExp('^(?=.*[!@#$%^&*])');
    return re.test(String(password));
  }

  validatePassword2(password2, password): boolean {
    if (!password2) {
      this.password2Error = 'Wachtwoord' + this.requiredError;
      return false;
    }

    if (!(password2 === password)) {
      this.password2Error = 'Wachtwoorden moeten overeenkomen';
      return false;
    }

    this.password2Error = '';
    return true;
  }

  private doSomethingInService(): void {

  }

  goBack(): void {
    this.location.back();
  }
}
