import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-header',
  templateUrl: './header.component.pug',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  searchVisible = false;
  searchField = '';

  constructor() {
  }

  ngOnInit() {
  }

  toggleSearchField() {
    this.searchVisible = !this.searchVisible;
  }

  submitSearchField() {
  }

  clearSearchField() {
    this.searchField = '';
  }

}
