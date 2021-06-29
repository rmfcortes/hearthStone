import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';

import { StorageService } from './services/utils/storage.service';
import { SqliteService } from './services/native/sqlite.service';
import { InfoService } from './services/data/info.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private storageService: StorageService,
    private sqliteService: SqliteService,
    private infoService: InfoService,
  ) {
    this.initializeApp();
  }

  async initializeApp() {
    await this.platform.ready();
    await this.storageService.init();
    this.sqliteService.initDB();
    this.infoService.getInfo();
  }

}
