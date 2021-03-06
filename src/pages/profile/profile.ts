import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { RecentPostsPage } from '../recent-posts/recent-posts';
import { FavAdsPage } from '../fav-ads/fav-ads';
import { AdsPage } from '../ads/ads';
import { AccountPage } from '../account/account';
import { FollowersPage } from '../followers/followers';
import { FollowingPage } from '../following/following';
import { ProfileUpdatePage } from '../profile-update/profile-update';

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
    private commonService: CommonService,
    private app: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    this.commonService.showLoader();
    this.userService.getCurrentUser().then(user => {
      this.getProfile(user.user_id);
    }).catch(err => {
      this.commonService.hideLoader();
    });
  }

  ionViewCanEnter(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser().then(user => {
        resolve(true);
      }).catch(() => {
        resolve(false);
        this.commonService.redirectToHome(this.app);
      });
    })
  }

  getProfile(userId) {
    this.userService.getProfile(userId).subscribe(res => {
      this.profile = (res as any).data;
      this.commonService.hideLoader();
    }, err => {
      this.commonService.hideLoader();
    });

  }

  gotoSettings() {
    this.navCtrl.push(SettingsPage);
  }

  gotoRecentPosts() {
    this.navCtrl.push(RecentPostsPage);
  }

  gotoFavAds() {
    this.navCtrl.push(FavAdsPage);
  }

  gotoAds() {
    this.navCtrl.push(AdsPage);
  }

  gotoAccount() {
    this.navCtrl.push(AccountPage);
  }

  gotofollowers() {
    this.navCtrl.push(FollowersPage);
  }

  gotoFollowing() {
    this.navCtrl.push(FollowingPage);
  }

  updateProfile() {
    this.navCtrl.push(ProfileUpdatePage);
  }
}
