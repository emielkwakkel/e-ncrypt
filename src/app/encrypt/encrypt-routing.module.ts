import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EncryptPage } from './encrypt.page';

const routes: Routes = [
  {
    path: '',
    component: EncryptPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EncryptPageRoutingModule {}
