import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISignTemplate} from '../../models/isign-template';
import {CategoryModel} from '../../models/category.model';
import {SignModel} from '../../models/sign.model';

@Component({
  selector: 'app-square-overview-tile',
  templateUrl: './square-overview-tile.component.html',
  styleUrls: ['./square-overview-tile.component.css']
})
export class SquareOverviewTileComponent implements OnInit {

  @Input()
  content: ISignTemplate;
  @Output() clickNavigationEmitter = new EventEmitter<ISignTemplate>();

  @Input()
  referencedDomain: string;

  constructor() {
    this.clickNavigationEmitter.subscribe(x => console.log(x));
  }

  ngOnInit(): void {
  }
}
