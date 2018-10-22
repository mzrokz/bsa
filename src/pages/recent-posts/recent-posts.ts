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
  selector: 'page-recent-posts',
  templateUrl: 'recent-posts.html',
})
export class RecentPostsPage {

  profile: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private commonService: CommonService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecentPostsPage');

  }


  goBack() {
    this.navCtrl.push(ProfilePage);
  }
}
