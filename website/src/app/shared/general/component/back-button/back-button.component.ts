import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISignTemplate} from '../../../signs/models/isign-template';

@Component({
  selector: 'app-shared-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css']
})
export class BackButtonComponent implements OnInit {

  @Input()   navigateBackModel: ISignTemplate;

  constructor() { }

  ngOnInit(): void {
  }

}
