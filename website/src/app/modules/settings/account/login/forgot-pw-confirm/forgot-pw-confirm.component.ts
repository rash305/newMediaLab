import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-forgot-pw-confirm',
  templateUrl: './forgot-pw-confirm.component.html',
  styleUrls: ['./forgot-pw-confirm.component.css']
})
export class ForgotPwConfirmComponent implements OnInit {

  @Output() messageSettingsStatus = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  continue() {
    this.messageSettingsStatus.emit('login');
  }
}
