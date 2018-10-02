import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  settings: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private commonService: CommonService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.getSettings();
  }

  getSettings() {
    this.commonService.showLoader();
    this.userService.getSettings(118).subscribe(res => {
      if (res.status == 200) {
        this.settings = res.data;
      }
      this.commonService.hideLoader();
    }, error => {
      console.log(error);
      this.commonService.hideLoader();
    });
  }

  onNotifyChange(e) {
    if (e.target.checked) {
      this.settings.isnotify = 1;
    } else {
      this.settings.isnotify = 0;
    }
    this.updateSettings();
  }

  updateSettings() {
    this.commonService.showLoader('Updating Settings');
    this.userService.updateSettings(this.settings).subscribe(res => {
      this.commonService.hideLoader();
    }, error => {
      console.log(error);
      this.commonService.hideLoader();
    });
  }

}
