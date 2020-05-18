import {Component, Input, OnInit} from '@angular/core';
import {ISignTemplate} from '../../models/isign-template';

@Component({
  selector: 'app-square-overview-tile',
  templateUrl: './square-overview-tile.component.html',
  styleUrls: ['./square-overview-tile.component.css']
})
export class SquareOverviewTileComponent implements OnInit {

  @Input()
  content: ISignTemplate;

  @Input()
  referencedDomain: string;

  constructor() { }

  ngOnInit(): void {
  }

}
