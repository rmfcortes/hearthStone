import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MazoPage } from './mazo.page';

const routes: Routes = [
  {
    path: '',
    component: MazoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MazoPageRoutingModule {}
