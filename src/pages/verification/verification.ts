import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Constant} from "../../providers/Constant";
import {WebServicesProvider} from "../../providers/web-services/web-services";
import { Storage } from '@ionic/storage';


/**
 * Generated class for the VerificationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-verification',
  templateUrl: 'verification.html',
})
export class VerificationPage {

  otp:any;
  dataFromPrevious:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loader: Constant,
              public webservice: WebServicesProvider,public storage:Storage) {
    this.dataFromPrevious = this.navParams.data.data;
   // console.log("this.dataFromPrevious : " + JSON.stringify(this.dataFromPrevious));
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad VerificationPage');
  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  openMainPage() {
    if (!this.validation()) {
      return;
    }
    //console.log("this.otp : " + this.otp);
  //  console.log("this.dataFromPrevious.otp : " + this.dataFromPrevious.otp);

    if(this.otp !== this.dataFromPrevious.otp){
     // console.log("otp not match")
      //this.loader.showToast('Please enter correct otp'); //todo need to uncomment on build
    }

    this.loader.showLoader();
    this.webservice.postVerifyOtp(this.dataFromPrevious.phone,this.otp,this.dataFromPrevious.type)
      .then(succ => {
        this.loader.hideLoader();
        let resp: any = {};
        resp = JSON.stringify(succ);
        let data = JSON.parse(resp);
        console.log("data: " + JSON.stringify(data));
        if (data.status === '200') {
         // console.log("data called in if : ");
          this.storage.set('userData',data.data);
          this.navCtrl.push('HomePage');
        }else if(data.status === '403'){
           this.loader.showToast(data.msg); //todo need to uncomment on build
        }
      }).catch(err => {
      this.loader.hideLoader()
    });

  }


  validation(): boolean {
    if (!this.otp || (this.otp && this.otp === 0)) {
      this.loader.showPopUp('Alert', 'Please enter otp');
      return false;
    }
    return true;
  }
}
