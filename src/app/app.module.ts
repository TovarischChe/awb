import { NgModule, ApplicationRef, NgModuleFactoryLoader, SystemJsNgModuleLoader } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainDialogComponent, MainDialogInnerComponent } from './components/main-dialog/main-dialog.component';
import { NewsListComponent } from './components/news-list/news-list.component';
import { ErrorComponent } from './components/error/error.component';

import { ApiService } from './shared';
import { ScrollService } from './shared/scroll.service';
import { Statesman } from './shared/statesman.service';

import { OnScreenEnterDirective } from './directives/on-screen-enter.directive';

import { UIRouterModule, UIView } from '@uirouter/angular';
import { states } from './app.routing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    NgbModule.forRoot(),
    BrowserAnimationsModule,
    UIRouterModule.forRoot({
      states,
      useHash: false
    })
  ],
  entryComponents: [
    MainDialogInnerComponent
  ],
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    MainDialogComponent, MainDialogInnerComponent,
    NewsListComponent,
    OnScreenEnterDirective
  ],
  providers: [
    ApiService,
    ScrollService,
    Statesman,
    { provide: NgModuleFactoryLoader, useClass: SystemJsNgModuleLoader }
  ],
  bootstrap: [UIView]
})
export class AppModule {
  constructor(public appRef: ApplicationRef) {
  }
  hmrOnInit(store) {
    console.log('HMR store', store);
  }
  hmrOnDestroy(store) {
    let cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // recreate elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // remove styles
    removeNgStyles();
  }
  hmrAfterDestroy(store) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
