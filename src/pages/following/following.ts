import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-following',
  templateUrl: 'following.html'
})
export class FollowingPage {

  following: any = [];
  currentUser: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private commonService: CommonService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FollowingPage');
    this.userService.getCurrentUser().then(user => {
      this.currentUser = user;
      this.commonService.showLoader();
      this.userService.getOtherUserProfile(this.currentUser.user_id).subscribe(res => {
        if (res.status == 200) {
          this.following = res.follower;
        }
        this.commonService.hideLoader();
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
