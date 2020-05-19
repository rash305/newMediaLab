import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-forgot-pw-new',
  templateUrl: './forgot-pw-new.component.html',
  styleUrls: ['./forgot-pw-new.component.css', '../../../settings-style.component.css']
})
export class ForgotPwNewComponent implements OnInit {

  password: string;
  password2: string;
  passwordError: string;

  private requiredError = ' moet worden ingevuld';

  @Output() messageSettingsStatus = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  saveNewPW(): void {
    // All validation checks
    if (this.validatePassword(this.password, this.password2)) {
      // Send object to backend API
      this.doSomethingInService();

      // Go to log in page
      this.messageSettingsStatus.emit('login');
    }
  }

  validatePassword(password, password2): boolean {
    if (!password || !password2) {
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

    if (!(password === password2)) {
      this.passwordError = 'Wachtwoorden moeten overeenkomen';
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

  private doSomethingInService(): void {
    // send new password to the service
    // and log the user in
  }

  goBack(): void {
    this.messageSettingsStatus.emit('forgotPwCode');
    // this.router.navigate(['/settings']);
  }
}
