import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  profile: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private commonService: CommonService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.commonService.showLoader();
    this.userService.getCurrentUser().then(user => {
      this.getProfile(user.user_id);
    }).catch(err => {
      this.commonService.showToast("Please log in to view Profile");
      this.commonService.hideLoader();
    });
  }

  getProfile(userId) {
    this.userService.getProfile(userId).subscribe(res => {
      debugger;
      this.profile = (res as any).data;
      this.commonService.hideLoader();
    }, err => {
      this.commonService.hideLoader();
    });

  }

  gotoSettings() {
    this.navCtrl.push(SettingsPage);
  }
}
