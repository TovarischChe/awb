import { Component, OnInit } from '@angular/core';
import { ScrollService } from '../../shared/scroll.service';
import { Statesman } from '../../shared/Statesman.service';
import * as _ from 'lodash';

@Component({
  selector: 'ac-news-list',
  templateUrl: './news-list.component.pug',
  providers: [Statesman],
  // directives: [OnScreenEnterDirective]
})
export class NewsListComponent implements OnInit {
  pages = [];
  page = {
    page: null,
    items: [
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
      },
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
      },
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
      },
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
      },
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
    ]
  };

  constructor(private scrollService: ScrollService, private statesman: Statesman) {
    this.scrollService.$WindowScrolledLeft10.subscribe(() => {
      let newPage = _.clone(this.page);
      newPage.page = this.pages.length + 1;
      this.pages.push(newPage);
    });
  }

  ngOnInit() {
    let newPage = _.clone(this.page);
    newPage.page = this.pages.length + 1;
    this.pages.push(newPage);
  }

  updatePageUrl(page) {
    this.statesman.go('current', {page});
  }

  leave(page) {
    console.debug('leave', page);
  }

}
