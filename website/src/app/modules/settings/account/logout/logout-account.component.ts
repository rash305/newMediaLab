import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../../shared/account/services/authentication.service';

@Component({
  selector: 'app-logout-account',
  templateUrl: './logout-account.component.html',
  styleUrls: ['./logout-account.component.css']
})
export class LogoutAccountComponent implements OnInit {

  @Output() messageSettingsStatus = new EventEmitter<string>();

  constructor(private router: Router, private authServer: AuthenticationService) { }

  ngOnInit(): void {
  }

  goBack(): void {
    this.messageSettingsStatus.emit('account');
  }

  logout(): void {
    // Do some service magic
    this.authServer.logout();
    location.reload(true);
  }
}
