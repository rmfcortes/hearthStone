import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LazyLoadImagesModule } from 'ngx-lazy-load-images';

import { MazoPageRoutingModule } from './mazo-routing.module';
import { MazoPage } from './mazo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LazyLoadImagesModule,
    MazoPageRoutingModule
  ],
  declarations: [MazoPage]
})
export class MazoPageModule {}
