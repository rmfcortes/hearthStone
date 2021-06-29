/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable quote-props */
import { Injectable } from '@angular/core';

import { Platform } from '@ionic/angular';

import { BehaviorSubject, from, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { CapacitorSQLite, SQLiteConnection, JsonSQLite, JsonTable,
         CapacitorSQLitePlugin } from '@capacitor-community/sqlite';

import { StorageService } from '../utils/storage.service';
import { AlertsService } from '../utils/alerts.service';
import { CardsService } from '../data/cards.service';

import { CardBackTable, CardTable } from 'src/app/models/Tables';
import { CardBack } from 'src/app/models/CardBack';
import { Card } from 'src/app/models/Cards';

@Injectable({
  providedIn: 'root'
})

export class SqliteService {

  dbReady = new BehaviorSubject<boolean>(false);
  dbName = 'hearthStoneDB';

  sqlite: CapacitorSQLitePlugin;

  //TODO create tables: cards, mazos(nombre personalizado)

  constructor(
    private platform: Platform,
    private storageService: StorageService,
    private alertService: AlertsService,
    private cardService: CardsService,
  ) { }

  async initDB() {
    this.sqlite = CapacitorSQLite;
    // await this.storageService.test();
    try {
      if (this.platform.is('android')) {
        const sqlite = CapacitorSQLite as any;
        await sqlite.requestPermissions();
      }
      this.setupDatabase();
    } catch (error) {
      alert('Esta app no puede trabajar sin acceso a la base de datos.');
    }
  }

  async setupDatabase() {
    const isDBInitialized = await this.storageService.getSetup();
    console.log('~ isDBInitialized', isDBInitialized);
    if (!isDBInitialized) {
      try {
        this.alertService.presentLoading('Por favor espere, estamos generando la base de datos');
        const tables = await Promise.all([this.getCards(), this.getCardsBack()]);
        console.log('~ tables', tables);
        this.setDatabase(tables);
      } catch (error) {
        console.log(error);
        this.alertService.dismissLoading();
      }
    } else {
      const consistentcy = await this.sqlite.checkConnectionsConsistency({dbNames: [this.dbName]});
      if (!consistentcy.result) {this.sqlite.createConnection({database: this.dbName});};
      console.log('~ consistentcy', consistentcy);
      this.sqlite.open({database: this.dbName});
      this.dbReady.next(true);
    }
  }

  /* Initialized database */

  getCards(): Promise<JsonTable> {
    return new Promise((resolve, reject) => {
      this.cardService.getCards().subscribe(async (cards) => {
        const cardTable = new CardTable();
        cardTable.values = cards;
        return resolve(cardTable);
      });
    });
  }

  getCardsBack(): Promise<JsonTable> {
    return new Promise((resolve, reject) => {
      this.cardService.getCardsBack().subscribe(async (cards) => {
        const cardTable = new CardBackTable();
        cardTable.values = cards;
        return resolve(cardTable);
      });
    });
  }

  async setDatabase(tables: JsonTable[]) {
    try {
      const database: JsonSQLite = {
        database: this.dbName,
        version: 2,
        encrypted: false,
        mode: 'full',
        tables
      };
      const jsonstring = JSON.stringify(database);
      const isValid = await CapacitorSQLite.isJsonValid({ jsonstring });
      if (isValid.result) {
        const sqliteConnection = await new SQLiteConnection(CapacitorSQLite);
        await sqliteConnection.importFromJson(jsonstring);
        this.sqlite.createSyncTable({database: this.dbName});
        this.storageService.setup();
        this.dbReady.next(true);
        this.alertService.dismissLoading();
      }
    } catch (error) {
      console.log(error);
      this.alertService.dismissLoading();
    }
  }

  /* Actions */
  getCardsList(lastID: number): Observable<Card[]> {
    return this.dbReady.pipe(
        switchMap(isReady => {
            if (!isReady) {
              return of([]);
            } else {
              const statement = `SELECT * FROM cards WHERE id > ${lastID} ORDER BY id LIMIT 50;`;
              return from(this.sqlite.query({ statement, values: [], database: this.dbName }))
                .pipe(map(result => result.values));
            }
        })
    );
  }

  async getCardsBackList(lastID: number): Promise<CardBack[]> {
    const statement = `SELECT * FROM cards_back WHERE id > ${lastID} ORDER BY id LIMIT 20;`;
    const result = await this.sqlite.query({ statement, values: [], database: this.dbName });
    return Promise.resolve(result.values);
  }

  async getLengthCardsBack(): Promise<number> {
    const statement = `SELECT COUNT(*) FROM cards_back;`;
    const result = await this.sqlite.query({ statement, values: [], database: this.dbName });
    return Promise.resolve(result.values[0]);
  }

}
