import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-main-dialog',
  templateUrl: './main-dialog.component.pug'
})
export class MainDialogComponent implements OnInit {
  article = {
    code: 'new-phantom',
    name: 'Представлен новый Rolls-Royce Phantom',
    image: {
      url: 'https://motor.ru/imgs/2017/07/28/07/1350927/05adabf65dd6cbf720122681378c6ff521dc3358.jpg'
    }
  };
  constructor() {
    // Do stuff
  }

  ngOnInit() {
    // console.log('Header component');
  }

}
