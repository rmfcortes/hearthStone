import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { take } from 'rxjs/operators';

import { DataSources } from 'src/app/config/data-sources';
import { Info } from 'src/app/models/Info';

import { StorageService } from '../utils/storage.service';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
  ) { }

  getInfo() {
    const endpoint = `${DataSources.baseUrlDefault}/info/`;
    return this.http.get<Info>(endpoint)
    .pipe(take(1))
    .subscribe(info => this.storageService.setInfo(info));
  }
}
