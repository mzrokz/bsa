import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {WebServicesProvider} from "../../services/web.service";
import {Storage} from '@ionic/storage';
import {CommonService} from '../../services/common.service';


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

  otp: any;
  dataFromPrevious: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public commonService: CommonService,
              public webservice: WebServicesProvider, public storage: Storage) {
    this.dataFromPrevious = this.navParams.data.data;
    // console.log("this.dataFromPrevious : " + JSON.stringify(this.dataFromPrevious));
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad VerificationPage');
  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  openMainPage(authToken) {
    if (!this.validation()) {
      return;
    }
    //console.log("this.otp : " + this.otp);
    //  console.log("this.dataFromPrevious.otp : " + this.dataFromPrevious.otp);

    if (this.otp !== this.dataFromPrevious.otp) {
      // console.log("otp not match")
      //this.loader.showToast('Please enter correct otp'); //todo need to uncomment on build
    }

    this.commonService.showLoader();
    this.webservice.postVerifyOtp(this.dataFromPrevious.phone, this.otp, this.dataFromPrevious.type)
      .subscribe(succ => {
        this.commonService.hideLoader();
        let resp: any = {};
        resp = JSON.stringify(succ);
        let data = JSON.parse(resp);
        console.log("data: " + JSON.stringify(data));
        if (data.status === '200') {
          // console.log("data called in if : ");
          this.storage.set('userData', JSON.stringify(data.data));
          this.storage.set('user_id', data.data.user_id);
          this.storage.set('auth_token', data.data.auth_token);

          // console.log('Authoken in response : ' + data.data.auth_token);

          this.navCtrl.setRoot('HomePage');
        } else if (data.status === '403') {
           this.commonService.showToast(data.msg); //todo need to uncomment on build
        }
      }, (err) => {
        this.commonService.hideLoader()
      });

  }


  validation(): boolean {
    if (!this.otp || (this.otp && this.otp === 0)) {
      this.commonService.showPopUp('Alert', 'Please enter otp');
      return false;
    }
    return true;
  }
}
