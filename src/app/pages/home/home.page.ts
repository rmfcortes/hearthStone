import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { SqliteService } from '../../services/native/sqlite.service';

import { Card } from '../../models/Cards';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  mazos: Card[] = [];

  lastID = 0;

  constructor(
    private router: Router,
    private sqliteService: SqliteService,
  ) {}

  ngOnInit() {
    this.watchDB();
  }

  watchDB() {
    this.sqliteService.getCardsList(this.lastID).subscribe(cards => {
      console.log('~ cards', cards);
    });
  }

  crearMazo() {
    this.router.navigateByUrl('mazo');
  }

  trackCard(index: number, card: Card): number {
    return card.id;
  }

}
