import { Ng2StateDeclaration } from '@uirouter/angular';

import { AppComponent } from './app.component';

import { routes as MainDialogRoutes } from './components/main-dialog/main-dialog.routing';
import { routes as NewsListRoutes } from './components/news-list/news-list.routing';
import { routes as ErrorRoutes } from './components/error/error.routing';

const AppRoutes = [
  { name: 'app', component: AppComponent }
];

export const states: Ng2StateDeclaration[] = [].concat(
  AppRoutes,
  ErrorRoutes,
  NewsListRoutes,
  MainDialogRoutes
);