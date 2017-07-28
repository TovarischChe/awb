import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ac-news-list',
  templateUrl: './news-list.component.pug'
})
export class NewsListComponent implements OnInit {

  news = [
    {
      code: 'new-phantom',
      name: 'Представлен новый Rolls-Royce Phantom',
      image: {
        url: 'https://motor.ru/imgs/2017/07/28/07/1350927/05adabf65dd6cbf720122681378c6ff521dc3358.jpg'
      }
    },
    {
      code: 'borgward-isabella',
      name: 'Марка Borgward вернет классическую модель «Изабелла»',
      image: {
        url: 'https://motor.ru/imgs/2017/07/27/14/1350681/3d049dabc9149a4fab767b38d29b4fb83b277461.jpg'
      }
    }
  ];

  constructor() {
    // Do stuff
  }

  ngOnInit() {
    // console.log('Header component');
  }

}
