import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchTerm: string;

  @Output() SearchTermEventEmitter = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  Search(searchTerm) {
    this.SearchTermEventEmitter.emit(searchTerm);
  }

}
