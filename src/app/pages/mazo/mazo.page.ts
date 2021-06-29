import { Component, OnDestroy, OnInit } from '@angular/core';

import { StorageService } from 'src/app/services/utils/storage.service';
import { SqliteService } from 'src/app/services/native/sqlite.service';

import { Info } from 'src/app/models/Info';
import { CardBack } from 'src/app/models/CardBack';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-mazo',
  templateUrl: './mazo.page.html',
  styleUrls: ['./mazo.page.scss'],
})
export class MazoPage implements OnInit, OnDestroy {

  info: Info;

  cards: CardBack[] = [];

  filtros: string[] = ['Classes', 'Sets', 'Type', 'Faction', 'Qualities', 'Race'];

  hasMoreContent = false;

  lastID = 0;

  dbReadySub: Subscription;

  constructor(
    private storageService: StorageService,
    private sqliteService: SqliteService,
  ) { }

  ngOnInit() {
    this.getInfo();
    this.isDBReady();
  }

  ngOnDestroy() {
    if (this.dbReadySub) {this.dbReadySub.unsubscribe();};
  }

  isDBReady() {
    this.dbReadySub = this.sqliteService.dbReady.subscribe(ready => {
      if (ready) {
        this.getCards();
        this.getLength();
      }
    });
  }

  async getCards(event?) {
    const cards = await this.sqliteService.getCardsBackList(this.lastID);
    this.lastID = cards[cards.length - 1].id;
    this.cards = this.cards.concat(cards);
    console.log('~ this.cards', this.cards);
    if (event) {event.target.complete();};
  }

  async getLength() {
    const length = await this.sqliteService.getLengthCardsBack();
    console.log('~ length', length);
    const tableLength = length['COUNT(*)'];
    if (tableLength > this.cards.length) {
      this.hasMoreContent = true;
    } else {
      this.hasMoreContent = false;
    }
    console.log('~ tableLength', tableLength);
  }

  async getInfo() {
    this.info = await this.storageService.getInfo();
    console.log('~  this.info',  this.info);
  }

}
