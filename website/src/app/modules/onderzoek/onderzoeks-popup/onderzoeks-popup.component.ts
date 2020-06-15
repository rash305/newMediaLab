import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-onderzoeks-popup',
  templateUrl: './onderzoeks-popup.component.html',
  styleUrls: ['./onderzoeks-popup.component.css']
})
export class OnderzoeksPopupComponent implements OnInit {

  @Output() MinimalizeOnderzoekPopupEvent = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  goBack(): void {
    localStorage.setItem('onderzoekPopupRead', 'True' );
    this.MinimalizeOnderzoekPopupEvent.emit(true);
  }
}
