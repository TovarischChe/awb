import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-header',
  templateUrl: './header.component.pug',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  searchVisible = false;
  searchField: string = '';

  constructor() {
  }

  ngOnInit() {
  }

  toggleSearchField() {
    this.searchVisible = !this.searchVisible;
  }

  submitSearchField() {
    console.debug(this.searchField);
  }

  clearSearchField() {
    this.searchField = '';
  }

}
