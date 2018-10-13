import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebServicesProvider } from "../../services/web.service";
import { CommonService } from '../../services/common.service';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  phoneNumber: number;
  email: any;

  signUpResponse: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public webservice: WebServicesProvider,
    private commonService: CommonService
  ) {
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
  }


  openSignUp() {
    this.navCtrl.push('SignupPage');

  }




  goToVerification() {
    if (!this.validation()) {
      return;
    }
    this.commonService.showLoader();
    this.webservice.postUserLogin(this.phoneNumber)
      .subscribe(data => {
        this.commonService.hideLoader();
        // console.log("data: " + JSON.stringify(data));
        if (data.status === '200') {
          this.commonService.showToast(data.otp);
          this.navCtrl.push('VerificationPage', { data: data });
          //todo need to uncomment on build
        } else if (data.status === '403') {
          this.commonService.showToast(data.msg); //todo need to uncomment on build
        }
      },(err) => {
      this.commonService.hideLoader()
    });

  }


  moveToMainScreen() {
    this.navCtrl.push('HomePage');

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

