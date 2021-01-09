import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncryptPage } from './encrypt.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { EncryptPageRoutingModule } from './encrypt-routing.module';

@NgModule({
  imports: [
    CommonModule,
    EncryptPageRoutingModule,
    ExploreContainerComponentModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  declarations: [EncryptPage]
})
export class EncryptPageModule {}
