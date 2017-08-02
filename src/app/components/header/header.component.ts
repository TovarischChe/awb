import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-header',
  templateUrl: './header.component.pug',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  searchVisible = false;

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    // console.log('Header component');
  }

  toggleSearchField(event) {
    this.searchVisible = !this.searchVisible;
  }

}
