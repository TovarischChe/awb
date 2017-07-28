import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { MainDialogComponent } from './components/main-dialog/main-dialog.component';
import { NewsListComponent } from './components/news-list/news-list.component';

import { ApiService } from './shared';
import { routing } from './app.routing';

import { MdToolbarModule, MdIconModule, MdListModule, MdIconRegistry } from '@angular/material';

import { removeNgStyles, createNewHosts } from '@angularclass/hmr';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    MdToolbarModule,
    MdIconModule,
    MdListModule,
    routing
  ],
  declarations: [
    AppComponent,
    HeaderComponent,
    MainDialogComponent,
    NewsListComponent
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, mdIconRegistry: MdIconRegistry) {
    mdIconRegistry.setDefaultFontSetClass('fa');
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
