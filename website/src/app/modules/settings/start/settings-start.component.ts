import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-settings-start',
  templateUrl: './settings-start.component.html',
  styleUrls: ['./settings-start.component.css', '../settings-style.component.css']
})
export class SettingsStartComponent implements OnInit {

  @Output() messageSettingsStatus = new EventEmitter<string>();

  constructor(private router: Router,
              private location: Location) { }

  ngOnInit(): void {
  }

  toAccount() {
    this.messageSettingsStatus.emit('account');
    this.router.navigate(['/settings']);
  }

  toHelp() {
    this.messageSettingsStatus.emit('help');
    this.router.navigate(['/settings']);
  }

  goBack(): void {
    this.location.back();
  }
}
