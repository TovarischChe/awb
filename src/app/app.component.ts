import { Component } from '@angular/core';

import { ApiService } from './shared';

// import { UIView } from '@uirouter/angular';

import '../static/styles/app.sass';

@Component({
  selector: 'ac-app',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';
  title: string;

  constructor(private api: ApiService) {
    this.title = this.api.title;
  }
}
