import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-confirm-change',
  templateUrl: './confirm-change.component.html',
  styleUrls: ['./confirm-change.component.css']
})
export class ConfirmChangeComponent implements OnInit {

  @Output() messageSettingsStatus = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  continue() {
    this.messageSettingsStatus.emit('start');
  }
}
