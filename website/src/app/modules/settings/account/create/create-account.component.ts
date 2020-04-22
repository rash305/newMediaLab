import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

  username: string;
  usernameError: string;
  emailAddress: string;
  emailError: string;

  password: string;
  passwordError: string;
  repeatedPassword: string;
  passwordError2: string;

  private requiredError = 'This field is required';
  constructor() { }

  ngOnInit(): void {
  }

  createAccount(): void {
    // temp variable to remember errors
    let errorOccurred = false;

    // All validation checks
    if (!this.validateUsername(this.username)) {
      errorOccurred = true;
    }
    if (!this.validateEmail(this.emailAddress)) {
      errorOccurred = true;
    }

    // Cancel account creation if any error  occurred
    if (errorOccurred) {
      return;
    }

    // Send object to backend API
    this.doSomethingInService();
  }


  validateUsername(username): boolean {
    if (!username) {
      this.usernameError = this.requiredError;
      return false;
    }
    if (username.length < 5) {
      this.usernameError = 'Username is too short';
      return false;
    }

    this.usernameError = '';
    return true;
  }

  validateEmail(email): boolean {
    if (!email) {
      this.emailError = this.requiredError;
      return false;
    }

    if (email.length < 1) {
      this.emailError = 'Email address is too short';
      return false;
    }

    if (!this.validateEmailRegex(email)) {
      this.emailError = 'Email format is incorrect';
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

  private doSomethingInService(): void {

  }
}
