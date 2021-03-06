/* eslint-disable @typescript-eslint/naming-convention */
// Generated by https://quicktype.io

export class CardBackConstructable implements CardBack {
    id:           number;
    cardBackId:   string;
    name:         string;
    description:  string;
    source:       any;
    enabled:      boolean;
    img?:         string;
    imgAnimated?: string;
    sortCategory: string;
    sortOrder:    string;
    locale:       any;
    howToGet?:    string;
    constructor(c: CardBack, i: number) {
            this.id =               i;
            this.cardBackId =   c.cardBackId || '';
            this.name =         c.name || '';
            this.description =  c.description || '';
            this.source =       c.source || '';
            this.enabled =      c.enabled || false;
            this.img =          c.img || '';
            this.imgAnimated =  c.imgAnimated || '';
            this.sortCategory = c.sortCategory || '';
            this.sortOrder =    c.sortOrder || '';
            this.locale =       c.locale || '';
            this.howToGet =     c.howToGet || '';
    }
}

export interface CardBack {
    id:           number;
    cardBackId:   string;
    name:         string;
    description:  string;
    source:       Source;
    enabled:      boolean;
    img?:         string;
    imgAnimated?: string;
    sortCategory: string;
    sortOrder:    string;
    locale:       Locale;
    howToGet?:    string;
}

export enum Locale {
    EnUS = 'enUS',
}

export enum Source {
    Achieve = 'achieve',
    FixedReward = 'fixed_reward',
    RewardSystem = 'reward_system',
    Season = 'season',
    Startup = 'startup',
    TavernBrawl = 'tavern_brawl',
}
