import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, App } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { SettingsModalPage } from './settings-modal';
import { LoginPage } from '../login/login';


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
    public modalCtrl: ModalController,
    public app: App
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.userService.getCurrentUser().then(user => {
      this.getSettings(user.user_id);
    }).catch(err => {
      this.commonService.hideLoader();
    });
  }

  getSettings(userId) {
    this.commonService.showLoader();
    this.userService.getSettings(userId).subscribe(res => {
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
    let settings = {};
    Object.assign(settings, this.settings)
    let settingsModal = this.modalCtrl.create(SettingsModalPage, { settings: settings });
    settingsModal.onDidDismiss(data => {
      this.getSettings();
    });
    settingsModal.present();
  }

  goBack() {
    this.navCtrl.pop();
  }

  logout() {
    var nav = this.app.getRootNav();
    nav.setRoot(LoginPage);
  }
}