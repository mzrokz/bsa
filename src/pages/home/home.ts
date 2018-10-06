import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  @ViewChild('myTabs') tabRef: Tabs;

  home = 'MainpagePage';
  mychats = 'MychatpagePage';
  addposts = 'AddPostPage';
  notifications = 'NotificationsPage';
  profile = 'ProfilePage';
  private tabSelectedIndex: number = 0;



  constructor(public navCtrl: NavController, public navParams: NavParams) {
    if (this.navParams.data) {
      if (this.navParams.data.page == 'mainPage') {
        this.home = 'MainpagePage';
      } else if (this.navParams.data.page == 'myChat') {
        this.mychats = 'MychatpagePage';
      } else if (this.navParams.data.page == 'addPost') {
        this.addposts = 'AddPostPage';
      } else if (this.navParams.data.page == 'notifications') {
        this.notifications = 'NotificationsPage';
      } else if (this.navParams.data.page == 'profile') {
        this.profile = 'ProfilePage';
      }
      this.tabSelectedIndex = this.navParams.data.tab;
    }

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
  }

}
