import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EncryptPage } from './encrypt.page';

import { EncryptPageRoutingModule } from './encrypt-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EncryptPageRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [EncryptPage]
})
export class EncryptPageModule {}
