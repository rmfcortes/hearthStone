import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { KeyInterceptorService } from './services/interceptor/key-interceptor.service';
import { ConnectivityChecker } from './services/utils/connectivity.service';
import { DataSources } from './config/data-sources';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot({
      name: 'HearthStone',
      driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage],
    })
  ],
  providers: [
    ConnectivityChecker,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: KeyInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
