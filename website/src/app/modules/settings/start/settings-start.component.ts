import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import {AuthenticationService} from '../../../shared/account/services/authentication.service';

@Component({
  selector: 'app-settings-start',
  templateUrl: './settings-start.component.html',
  styleUrls: ['./settings-start.component.css', '../settings-style.component.css']
})
export class SettingsStartComponent implements OnInit {

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

  toAccount() {
    this.messageSettingsStatus.emit('change');
  }

  toLogout(): void {
    this.messageSettingsStatus.emit('logout');
  }

  toHelp() {
    this.messageSettingsStatus.emit('help');
  }

  goBack(): void {
    this.messageSettingsStatus.emit('close');
  }
}
