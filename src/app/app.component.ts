import { Component } from '@angular/core';
import { ApiService } from './shared';
import { ScrollService } from './shared/scroll.service';
import '../static/styles/app.sass';

@Component({
  selector: 'ac-app',
  templateUrl: './app.component.pug',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  url = 'https://github.com/preboot/angular2-webpack';
  title: string;

  constructor(private api: ApiService, private scrollService: ScrollService) {
    this.title = this.api.title;
    this.scrollService.watch();
  }
}
