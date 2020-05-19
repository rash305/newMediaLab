import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-forgot-pw-code',
  templateUrl: './forgot-pw-code.component.html',
  styleUrls: ['./forgot-pw-code.component.css', '../../../settings-style.component.css']
})
export class ForgotPwCodeComponent implements OnInit {

  one: string;
  two: string;
  three: string;
  four: string;

  codeError: string;

  @Output() messageSettingsStatus = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  continue(): void {
    // All validation checks
    if (this.validateCode(this.one, this.two, this.three, this.four)) {
      // Go to next page
      this.messageSettingsStatus.emit('forgotPwNew');
    }
  }

  validateCode(one, two, three, four): boolean {
    if (!one || !two || !three || !four) {
      this.codeError = 'Alle cijfers moeten worden ingevuld';
      return false;
    }

    // Do something in service to validate email
    if (one === '1') {
      this.codeError = 'De verficatiecode is incorrect';
      return false;
    }

    this.codeError = '';
    return true;
  }

  goBack(): void {
    this.messageSettingsStatus.emit('forgotPw');
    // this.router.navigate(['/settings']);
  }
}
