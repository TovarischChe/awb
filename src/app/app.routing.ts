import { AppComponent } from './app.component';
import { MainDialogComponent } from './components/main-dialog/main-dialog.component';
import { NewsListComponent } from './components/news-list/news-list.component';

import { Ng2StateDeclaration } from '@uirouter/angular';

export let routes: Ng2StateDeclaration[] = [
    { name: 'app', component: AppComponent },
    { name: 'app.news', url: '^/', component: NewsListComponent },
    { name: 'app.news.detail', url: 'news/:articleCode', component: MainDialogComponent }
];
