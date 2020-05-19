import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../shared/account/services/authentication.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css', '../settings-style.component.css']
})
export class AccountComponent implements OnInit {

  @Output() messageSettingsStatus = new EventEmitter<string>();
  isLoggedIn: boolean;

  constructor(private router: Router, authenticationService: AuthenticationService) {
    authenticationService.isLoggedInEmitter.subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
    authenticationService.isLoggedIn();
  }

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

  goBack(): void {
    this.messageSettingsStatus.emit('start');
  }
}
