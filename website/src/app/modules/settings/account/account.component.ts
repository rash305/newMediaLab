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
    this.router.navigate(['/settings']);
  }

  toRegister(): void {
    this.messageSettingsStatus.emit('register');
    this.router.navigate(['/settings']);
  }

  toChangeAccount(): void {
    this.messageSettingsStatus.emit('change');
    this.router.navigate(['/settings']);
  }

  toLogout(): void {
    // do some service magic

    // not sure where this should go to
    this.messageSettingsStatus.emit('start');
    this.router.navigate(['/settings']);
  }

  isLoggedIn(): boolean {
    // get login status from service
    return false;
  }

  goBack(): void {
    this.messageSettingsStatus.emit('start');
    this.router.navigate(['/settings']);
  }
}
