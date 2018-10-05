import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { SettingsModalPage } from './settings-modal';


@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

  settings: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private commonService: CommonService,
    public modalCtrl: ModalController
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

  openEditSettings() {
    debugger;
    let settingsModal = this.modalCtrl.create(SettingsModalPage, { settings: this.settings });
    settingsModal.present();
  }

}
