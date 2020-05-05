import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) { }

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
    // something with service to check correctness of login
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
    this.messageSettingsStatus.emit('account');
    // this.router.navigate(['/settings']);
  }

  toForgotPW() {
    this.messageSettingsStatus.emit('forgotPw');
  }
}
