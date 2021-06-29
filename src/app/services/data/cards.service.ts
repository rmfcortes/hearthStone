import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map, take } from 'rxjs/operators';

import { DataSources } from 'src/app/config/data-sources';

import { Card, CardConstructable } from 'src/app/models/Cards';
import { CardBack, CardBackConstructable } from 'src/app/models/CardBack';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient,) { }

  getCards() {
    const endpoint = `${DataSources.baseUrlDefault}/cards/`;
    return this.http.get<Card[][]>(endpoint)
    .pipe(
      take(1),
      map(cards => {
        const newCards: Card[] = [].concat(...Object.values(cards));
        const values = newCards.map((c, i) => {
          const o = new CardConstructable(c, i);
          o.mechanics = o.mechanics.map(m => m.name).join(', ');
          o.classes = o.classes.join(', ');
          return Object.values(o);
        });
        return values;
      }),
    );
  }

  getCardsBack() {
    const endpoint = `${DataSources.baseUrlDefault}/cardbacks/`;
    return this.http.get<CardBack[]>(endpoint)
    .pipe(
      take(1),
      map(cards => {
        const values = cards.map((c, i) => {
          const o = new CardBackConstructable(c, i);
          return Object.values(o);
        });
        return values;
      }),
    );
  }

}
