import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Constant} from "../../providers/Constant";
import {WebServicesProvider} from "../../providers/web-services/web-services";


/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  phoneNumber: number;
  constructor(public navCtrl: NavController,
              public navParams: NavParams, public loader: Constant,
              public webservice: WebServicesProvider) {
  }


  ionViewDidLoad() {
  //  console.log('ionViewDidLoad SignupPage');
  }

  goToVerification() {
    if (!this.validation()) {
      return;
    }
    this.loader.showLoader();
    this.webservice.postUserSignUp(this.phoneNumber)
      .then(succ => {
        this.loader.hideLoader();
        let resp: any = {};
        resp = JSON.stringify(succ);
        let data = JSON.parse(resp);
        console.log("data: " + JSON.stringify(data));
        if (data.status === '200') {
          this.navCtrl.push('VerificationPage', {data: data});
          this.loader.showToast(data.otp); //todo need to uncomment on build
        }else if(data.status === '403'){
          this.loader.showToast(data.msg); //todo need to uncomment on build
        }

      }).catch(err => {
      this.loader.hideLoader()
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
      this.loader.showPopUp('Alert', 'Please enter phone number');
      return false;
    }
    return true;
  }

}
