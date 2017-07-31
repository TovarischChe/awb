import { MainDialogComponent } from './main-dialog.component';

export const routes = [
  {
    name: 'app.news.detail',
    url: 'news/:articleCode',
    component: MainDialogComponent
  }
];
