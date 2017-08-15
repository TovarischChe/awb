import { NewsListComponent } from './news-list.component';

export const routes = [
  {
    name: 'app.news',
    url: '^/?page',
    component: NewsListComponent,
    params: {
      page: {
        replace: true,
        value: null,
        isOptional: true,
        dynamic: true
      }
    }
  }
];
