import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import {Account} from '../../../../shared/account/models/account';
import {AccountService} from '../../../../shared/account/services/account.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css', '../../settings-style.component.css']
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

  @Output() messageSettingsStatus = new EventEmitter<string>();

  constructor(private router: Router,
              private accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  createAccount(): void {
    // All validation checks
    if ([this.validateUsername(this.username),
        this.validateEmail(this.emailAddress),
        this.validatePassword(this.password),
        this.validatePassword2(this.password2, this.password)].every(Boolean)) {

      const account = new Account(this.username, this.password, this.emailAddress);
      // Send object to backend API
      this.createAccountOnServer(account);

      // Go to categories page (and be logged in)
      // this.router.navigate(['/categories']);
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
    this.accountService.checkUsernameAvailability(username)
      .subscribe(result => {
        if ( result) {
          this.usernameError = '';
          return true;
        }
        this.usernameError = 'Gebruikersnaam kan niet worden gebruikt';
        return false;
      });
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

    this.emailError = 'Valideren...';

    this.accountService.checkEmailAvailability(email)
      .subscribe(result => {
        if ( result) {
          this.emailError = '';
          return true;
        }
        this.emailError = 'E-mailadres kan niet worden gebruikt';
        return false;
      });
  }

  private validateEmailRegex(email) {
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

  private validatePasswordRegex(password): boolean {
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

  private createAccountOnServer(account: Account): void {
    this.accountService.createAccount(account)
      .subscribe(jwt => {
        if (jwt === null) {
          // Account is not created
          // Toaster message is enough for now
        } else {
          // log user in
          window.alert('TODO: Login with the received JWT token.');
        }
      });

  }

  goBack(): void {
    this.messageSettingsStatus.emit('account');
  }
}
