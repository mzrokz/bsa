import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtherUserProfilePage } from './other-user-profile';

@NgModule({
  declarations: [
    OtherUserProfilePage,
  ],
  imports: [
    IonicPageModule.forChild(OtherUserProfilePage),
  ],
})
export class OtherUserProfilePageModule {}
