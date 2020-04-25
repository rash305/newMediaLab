import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login-account',
  templateUrl: './login-account.component.html',
  styleUrls: ['./login-account.component.css', '../account.component.css']
})
export class LoginAccountComponent implements OnInit {

  username: string;
  usernameError: string;

  password: string;
  passwordError: string;

  incorrectLoginError: string;

  private requiredError = ' moet worden ingevuld';

  @Output() messageLoginStatus = new EventEmitter<boolean>();

  constructor(private router: Router,
              private location: Location) { }

  ngOnInit(): void {
  }

  logIn(): void {
    // All validation checks
    if ([this.validateUsername(this.username),
      this.validatePassword(this.password)].every(Boolean)) {

      // check if login is valid
      if (this.validateLogin(this.username, this.password)) {
        // Send object to backend API
        this.doSomethingInService();

        // send message that you are logged in to activate camera
        this.messageLoginStatus.emit(true);
        // Go to categories page (and be logged in)
        this.router.navigate(['/categories']);
      }
    }
  }

  validateUsername(username): boolean {
    if (!username) {
      this.usernameError = 'Gebruikersnaam' + this.requiredError;
      return false;
    }

    this.usernameError = '';
    return true;
  }

  validatePassword(password): boolean {
    if (!password) {
      this.passwordError = 'Wachtwoord' + this.requiredError;
      return false;
    }

    this.passwordError = '';
    return true;
  }

  private validateLogin(username: string, password: string) {
    // something with server to check correctness of login
    // login is incorrect
    if (username.includes('a')) {
      this.incorrectLoginError = 'Combinatie van gebruikersnaam en wachtwoord is incorrect';
      return false;
    }

    // login is correct
    this.incorrectLoginError = '';
    return true;
  }

  private doSomethingInService(): void {

  }

  goBack(): void {
    this.location.back();
  }
}
