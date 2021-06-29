import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage-angular';

import { Info } from 'src/app/models/Info';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage | null = null;

  constructor(private storageDB: Storage,) { }

  async init(): Promise<void> {
    const storage = await this.storageDB.create();
    this.storage = storage;
    Promise.resolve();
  }

  setup() {
    this.storage?.set('setup', true);
  }

  async getSetup(): Promise<boolean> {
    return this.storage?.get('setup');
  }

  test() {
    this.storage?.set('setup', false);
  }

  setInfo(info: Info) {
    this.storage?.set('info', info);
  }

  getInfo(): Promise<Info> {
    return this.storage?.get('info');
  }

}
