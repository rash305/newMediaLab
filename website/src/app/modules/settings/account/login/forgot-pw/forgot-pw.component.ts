import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-forgot-pw',
  templateUrl: './forgot-pw.component.html',
  styleUrls: ['./forgot-pw.component.css', '../../../settings-style.component.css']
})
export class ForgotPwComponent implements OnInit {

  emailAddress: string;
  emailError: string;

  private requiredError = ' moet worden ingevuld';

  @Output() messageSettingsStatus = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  continue(): void {
    // All validation checks
    if (this.validateEmail(this.emailAddress)) {
      // Go to next page
      this.messageSettingsStatus.emit('forgotPwCode');
    }
  }

  validateEmail(email): boolean {
    if (!email) {
      this.emailError = 'E-mailadres' + this.requiredError;
      return false;
    }

    // Do something in service to validate email
    if (email.includes('a')) {
      this.emailError = 'Er is geen account voor dit e-mailadres';
      return false;
    }

    this.emailError = '';
    return true;
  }

  goBack(): void {
    this.messageSettingsStatus.emit('login');
    // this.router.navigate(['/settings']);
  }
}
