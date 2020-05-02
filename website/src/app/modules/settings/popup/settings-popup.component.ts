import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.css']
})
export class SettingsPopupComponent implements OnInit {

  private settingsStatus = 'start';

  constructor() { }

  ngOnInit(): void {
  }

  receiveSettingStatus($event: string) {
    this.settingsStatus = $event;
  }

  show(status: string): boolean {
    return this.settingsStatus === status;
  }
}
