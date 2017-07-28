import { RouterModule, Routes } from '@angular/router';

import { MainDialogComponent } from './components/main-dialog/main-dialog.component';
import { NewsListComponent } from './components/news-list/news-list.component';

const routes: Routes = [
    { path: '', component: NewsListComponent, pathMatch: 'full' },
    { path: 'news/:code', component: MainDialogComponent }
];

export const routing = RouterModule.forRoot(routes);
