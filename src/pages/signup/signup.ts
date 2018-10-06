import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebServicesProvider } from "../../services/web.service";
import { CommonService } from '../../services/common.service';


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  phoneNumber: number;
  constructor(public navCtrl: NavController,
    public navParams: NavParams, public commonService: CommonService,
    public webservice: WebServicesProvider) {
  }


  ionViewDidLoad() {
    //  console.log('ionViewDidLoad SignupPage');
  }

  goToVerification() {
    if (!this.validation()) {
      return;
    }
    this.commonService.showLoader();
    this.webservice.postUserSignUp(this.phoneNumber)
      .then(succ => {
        this.commonService.hideLoader();
        let resp: any = {};
        resp = JSON.stringify(succ);
        let data = JSON.parse(resp);
        console.log("data: " + JSON.stringify(data));
        if (data.status === '200') {
          this.navCtrl.push('VerificationPage', { data: data });
          this.commonService.showToast(data.otp); //todo need to uncomment on build
        } else if (data.status === '403') {
          this.commonService.showToast(data.msg); //todo need to uncomment on build
        }

      }).catch(err => {
        this.commonService.hideLoader()
      });

  }


  moveToMainScreen() {
    this.navCtrl.push('MainpagePage');

  }

  openLogin() {
    this.navCtrl.push('LoginPage');

  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  validation(): boolean {
    if (!this.phoneNumber || (this.phoneNumber && this.phoneNumber === 0)) {
      this.commonService.showPopUp('Alert', 'Please enter phone number');
      return false;
    }
    return true;
  }

}
