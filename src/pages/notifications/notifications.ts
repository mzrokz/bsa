import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {WebServicesProvider} from "../../services/web.service";
import {CommonService} from "../../services/common.service";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  auth_token: any;
  user_id: any;
  notificationListDataModal: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public webservice: WebServicesProvider,
              public commonService: CommonService, public storage: Storage) {


    this.storage.get('auth_token').then(auth_token => {
      this.auth_token = auth_token;
      console.log('Auth token : ' + this.auth_token);
    });

    this.storage.get('user_id').then(user_id => {
      this.user_id = user_id;
      console.log('this.userId in storage ' + this.user_id);
      this.getNotificationListData();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  getNotificationListData() {
    if (this.user_id != null || this.user_id != undefined) {
      this.commonService.showLoader();
      this.webservice.getNotificationListApi(this.auth_token, this.user_id).subscribe(responce => {
        this.commonService.hideLoader();
        let resp: any = {};
        resp = JSON.stringify(responce);
        let data = JSON.parse(resp);
        if (data.status === '200') {
          let dataOnlyHere = JSON.stringify(data.follower);
          this.notificationListDataModal = JSON.parse(dataOnlyHere);
          console.log('notificationListDataModal', JSON.stringify(this.notificationListDataModal));
        }
      }, (err) => {
        this.commonService.hideLoader();

        let err1: any = err;
        let error = JSON.parse(JSON.stringify(err1));
        console.log('error with status', JSON.stringify(error));

      });
    }

  }


}
