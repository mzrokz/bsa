import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ChattingScreenPage } from './chatting-screen';

@NgModule({
  declarations: [
    ChattingScreenPage,
  ],
  imports: [
    IonicPageModule.forChild(ChattingScreenPage),
  ],
})
export class ChattingScreenPageModule {}
