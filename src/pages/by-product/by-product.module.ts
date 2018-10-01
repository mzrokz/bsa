import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ByProductPage } from './by-product';

@NgModule({
  declarations: [
    ByProductPage,
  ],
  imports: [
    IonicPageModule.forChild(ByProductPage),
  ],
})
export class ByProductPageModule {}
