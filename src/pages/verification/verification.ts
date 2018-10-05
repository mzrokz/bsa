import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {
  mobNumber: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VerificationPage');
  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  openMainPage() {
   // this.navCtrl.push('MainpagePage');
    this.navCtrl.push('HomePage');
  }
}
