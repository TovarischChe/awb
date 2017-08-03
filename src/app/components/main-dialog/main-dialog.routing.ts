/* tslint:disable */
import { MainDialogComponent } from './main-dialog.component';

export const routes = [
  {
    name: 'app.news.detail',
    url: 'news/:articleCode',
    views: {
      'main-dialog@app': {
        component: MainDialogComponent
      }
    },
    // onEnter: (transition, state) => {
    //   debugger
    //   console.log(transition, state)
    // }
  }
];
/* tslint:enable */
