import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', '../settings-style.component.css']
})
export class AccountComponent implements OnInit {

  @Output() messageSettingsStatus = new EventEmitter<string>();

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  toLogin(): void {
    this.messageSettingsStatus.emit('login');
  }

  toRegister(): void {
    this.messageSettingsStatus.emit('register');
  }

  toChangeAccount(): void {
    this.messageSettingsStatus.emit('change');
  }

  toLogout(): void {
    this.messageSettingsStatus.emit('logout');
  }

  isLoggedIn(): boolean {
    // get login status from service
    return false;
  }

  goBack(): void {
    this.messageSettingsStatus.emit('start');
  }
}
