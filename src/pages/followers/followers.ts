import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { ProfilePage } from '../profile/profile';
import { OtherUserProfilePage } from '../other-user-profile/other-user-profile';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-followers',
  templateUrl: 'followers.html'
})
export class FollowersPage {

  followers: any = [];
  currentUser: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private commonService: CommonService
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowersPage');
    this.userService.getCurrentUser().then(user => {
      this.currentUser = user;
      this.commonService.showLoader();
      this.userService.getOtherUserProfile(this.currentUser.user_id).subscribe(res => {
        this.commonService.hideLoader();
        if (res.status == 200) {
          this.followers = res.follower;
        }
      }, err => {
        this.commonService.hideLoader();
        console.error(err);
      });
    });
  }

  goBack() {
    this.navCtrl.push(ProfilePage);
  }

  gotoProfile(user) {
    // this.navCtrl.push(OtherUserProfilePage, { "recepientId": user.user_id });
  }
}
