import { Component } from '@angular/core';
import { NavController, NavParams} from 'ionic-angular';
import {WebServicesProvider} from "../../services/web.service";
import {CommonService} from "../../services/common.service";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the SearchPage page.
 *  
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  search:any;
  searchApiData:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public webservice: WebServicesProvider,
              public commonService: CommonService, public storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  getSearch(/*ev: any*/) {
   // this.search = ev.target.value;

    if(this.search && this.search == null){
      this.commonService.showPopUp('Alert','Please enter something to search');
    }

    console.log('search keyword : ' +  this.search);

    if(this.search && this.search != ''){
      this.commonService.showLoader();
      this.webservice.postSearchApi(this.search)
        .subscribe(responce => {

          if(responce){
            this.commonService.hideLoader();
            let resp: any = {};
            resp = JSON.stringify(responce);
            let data = JSON.parse(resp);
            if (data.status === '200') {
              let dataOnlyHere = JSON.stringify(data.data);
              this.searchApiData = JSON.parse(dataOnlyHere);
              // let data = JSON.parse(json.data || '{}');
              console.log("this.searchApiData !!!!!!!!! " + JSON.stringify(this.searchApiData));
            }else {
              this.commonService.showToast(data.msg);//todo need to uncomment in build
              console.log(' else msg : ' +  data.msg);
            }
          }

        }, (err) => {
          this.commonService.hideLoader();

          let err1: any = err;
          let error = JSON.parse(JSON.stringify(err1));
          console.log('error with status', JSON.stringify(error));

        });
    }
  }

  openProductDetailPage(data) {
    this.navCtrl.push('ProductdetailscreenPage', { data: data })
  }

}
