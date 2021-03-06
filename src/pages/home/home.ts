import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Tabs} from 'ionic-angular';
import {UserService} from '../../services/user.service';
import {WebServicesProvider} from "../../services/web.service";
import {Storage} from "@ionic/storage";

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
  tabSelectedIndex: number = 0;

  isLoggedIn: boolean = false;

  isSkipLogin: boolean = false;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, private userService: UserService, public storage: Storage
  ) {
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
      this.isSkipLogin = this.navParams.data.isSkipLogin;

      if(this.isSkipLogin){
        this.storage.set('isSkipLogin', this.isSkipLogin);
      }
    }

    this.userService.getCurrentUser().then(user => {
      this.isLoggedIn = true;
    }).catch(err => {
      this.isLoggedIn = false;
    });


  }

  navigatePage(page) {
    this.navCtrl.push(page);
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad HomePage');
  }

}
