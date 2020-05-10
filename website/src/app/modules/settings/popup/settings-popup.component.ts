import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-settings-popup',
  templateUrl: './settings-popup.component.html',
  styleUrls: ['./settings-popup.component.css', '../settings-style.component.css']
})
export class SettingsPopupComponent implements OnInit {

  private settingsStatus: string;
  @Output() SettingsMinimalizeEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.settingsStatus = 'start';
  }

  receiveSettingStatus($event: string) {
    if ($event === 'close') {
      this.SettingsMinimalizeEvent.emit(true);
      this.settingsStatus = 'start';
    } else {
      this.settingsStatus = $event;
    }
  }

  show(status: string): boolean {
    return this.settingsStatus === status;
  }
}
