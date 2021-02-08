import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HashPage } from './hash.page';

import { HashPageRoutingModule } from './hash-routing.module';
import { CryptoService } from '../crypto.service';

@NgModule({
  imports: [
    CommonModule,
    HashPageRoutingModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [ HashPage ],
  providers: [ CryptoService ],
})
export class HashPageModule {}
