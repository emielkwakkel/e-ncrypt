import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { EncryptPage } from './encrypt.page';

import { EncryptPageRoutingModule } from './encrypt-routing.module';
import { CryptoService } from './crypto.service';

@NgModule({
  imports: [
    CommonModule,
    EncryptPageRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [ EncryptPage ],
  providers: [ CryptoService ],
})
export class EncryptPageModule {}
