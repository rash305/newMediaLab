import {Component, OnInit, Output, EventEmitter} from '@angular/core';
import {Router} from '@angular/router';
import {Account} from '../../../../shared/account/models/account';
import {AccountService} from '../../../../shared/account/services/account.service';
import {AuthenticationService} from '../../../../shared/account/services/authentication.service';

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

  @Output() messageSettingsStatus = new EventEmitter<string>();

  constructor(private router: Router,
              private accountService: AccountService,
              private authenticationService: AuthenticationService) {
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

      // Close popup (and be logged in)
      this.messageSettingsStatus.emit('close');
    }
  }

  validateUsername(username): boolean {
    if (!username) {
      this.usernameError = 'settings.register.error.username';
      return false;
    }

    if (username.length < 5) {
      this.usernameError = 'settings.register.error.username-5chars';
      return false;
    }

    this.usernameError = 'settings.register.error.validate';
    let returnValue = true;
    this.accountService.checkUsernameAvailability(username)
      .toPromise().then(result => {
        if (result) {
          this.usernameError = '';
          returnValue = true;
        } else {
          this.usernameError = 'settings.register.error.username-inuse';
          returnValue = false;
        }
      });
    return returnValue;
  }

   validateEmail(email): boolean {
     if (!email) {
       this.emailError = 'settings.register.error.emailadress';
       return false;
     }

     if (!this.validateEmailRegex(email)) {
       this.emailError = 'settings.register.error.emailadress-wrong-format';
       return false;
     }

     this.emailError = 'settings.register.error.validate';
     let returnValue = true;
     this.accountService.checkEmailAvailability(email)
       .toPromise().then(result => {
         if (result) {
           this.emailError = '';
           returnValue = true;
         } else {
           this.emailError = 'settings.register.error.emailadress-inuse';
           returnValue =  false;         }

       });
     return returnValue;
   }

  private validateEmailRegex(email) {
    // tslint:disable-next-line:max-line-length
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  validatePassword(password): boolean {
    if (!password) {
      this.passwordError = 'settings.register.error.password';
      return false;
    }

    if (password.length < 8) {
      this.passwordError = 'settings.register.error.password-8chars';
      return false;
    }

    if (!this.validatePasswordRegex(password)) {
      this.passwordError = 'settings.register.error.password-specialchar';
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
      this.password2Error = 'settings.register.error.password2';
      return false;
    }

    if (!(password2 === password)) {
      this.password2Error = 'settings.register.error.password2-unequal';
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
          this.login(account);
        }
      });
  }

  private login(account: Account) {
    this.authenticationService.login(account.username, account.password)
      .subscribe(accountId =>       {
        if (accountId === null) {
          // Account is not created
          // Toaster message is enough for now
        } else {
          // log user in
          location.reload(true);
        }
      });
  }

  goBack(): void {
    this.messageSettingsStatus.emit('account');
  }
}
