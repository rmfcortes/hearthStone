import { JsonColumn, JsonTable } from '@capacitor-community/sqlite';

export class CardTable implements JsonTable{
    name = 'cards';
    values = [];
    schema: JsonColumn[] = [
        { column: 'id', value: 'INTEGER PRIMARY KEY NOT NULL' },
        { column: 'cardId', value: 'TEXT NOT NULL' },
        { column: 'dbfId', value: 'TEXT NOT NULL' },
        { column: 'name', value: 'TEXT NOT NULL' },
        { column: 'cardSet', value: 'TEXT NOT NULL' },
        { column: 'type', value: 'TEXT' },
        { column: 'text', value: 'TEXT' },
        { column: 'playerClass', value: 'TEXT' },
        { column: 'locale', value: 'TEXT NOT NULL' },
        { column: 'rarity', value: 'TEXT' },
        { column: 'health', value: 'INTEGER' },
        { column: 'mechanics', value: 'TEXT' },
        { column: 'faction', value: 'TEXT' },
        { column: 'elite', value: 'BOOLEAN' },
        { column: 'cost', value: 'INTEGER' },
        { column: 'attack', value: 'INTEGER' },
        { column: 'race', value: 'TEXT' },
        { column: 'img', value: 'TEXT' },
        { column: 'spellSchool', value: 'TEXT' },
        { column: 'flavor', value: 'TEXT' },
        { column: 'artist', value: 'TEXT' },
        { column: 'collectible', value: 'BOOLEAN' },
        { column: 'imgGold', value: 'TEXT' },
        { column: 'durability', value: 'INTEGER' },
        { column: 'howToGetGold', value: 'TEXT' },
        { column: 'howToGet', value: 'TEXT' },
        { column: 'armor', value: 'TEXT' },
        { column: 'multiClassGroup', value: 'TEXT' },
        { column: 'classes', value: 'TEXT' },
        { column: 'howToGetDiamond', value: 'TEXT' },
    ];
}

export class CardBackTable implements JsonTable{
    name = 'cards_back';
    values = [];
    schema: JsonColumn[] = [
        { column: 'id', value: 'INTEGER PRIMARY KEY NOT NULL' },
        { column: 'cardBackId', value: 'TEXT' },
        { column: 'name', value: 'TEXT' },
        { column: 'description', value: 'TEXT' },
        { column: 'source', value: 'TEXT' },
        { column: 'enabled', value: 'BOOLEAN' },
        { column: 'img', value: 'TEXT' },
        { column: 'imgAnimated', value: 'TEXT' },
        { column: 'sortCategory', value: 'TEXT' },
        { column: 'sortOrder', value: 'TEXT' },
        { column: 'locale', value: 'TEXT' },
        { column: 'howToGet', value: 'TEXT' },
    ];
}

