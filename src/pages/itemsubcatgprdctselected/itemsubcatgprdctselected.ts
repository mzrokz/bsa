import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebServicesProvider } from "../../services/web.service";
import { CommonService } from '../../services/common.service';

/**
 * Generated class for the ItemsubcatgprdctselectedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-itemsubcatgprdctselected',
  templateUrl: 'itemsubcatgprdctselected.html',
})
export class ItemsubcatgprdctselectedPage {

  category_id: any;
  dataFromPrevious: any;
  subCategoryName: any;
  rootCategoryName: any;
  itemChildCategoryResponse: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public webservice: WebServicesProvider,
    public commonService: CommonService
  ) {

    this.dataFromPrevious = this.navParams.data.data;
    // console.log("this.dataFromPrevious ", JSON.stringify(this.dataFromPrevious));

    this.category_id = this.dataFromPrevious.category_id;
    this.rootCategoryName = this.navParams.data.rootCategoryName;
    this.subCategoryName = this.dataFromPrevious.category_name;

  }

  openProductDetailPage(data) {
    this.navCtrl.push('ProductdetailscreenPage', { data: data })
  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    //  console.log('ionViewDidLoad ItemsubcatgprdctselectedPage');
    this.callGetItemChildCategoryApi();
  }


  callGetItemChildCategoryApi() {
    if (this.category_id != null) {
      this.commonService.showLoader();
      this.webservice.getItemChildCategory(this.category_id)
        .subscribe(responce => {
          this.commonService.hideLoader();
          let resp: any = {};
          resp = JSON.stringify(responce);
          let data = JSON.parse(resp);
          if (data.status === '200') {
            let dataOnlyHere = JSON.stringify(data.data);
            this.itemChildCategoryResponse = JSON.parse(dataOnlyHere);
            //console.log("this.itemChildCategoryResponse !!!!!!!!! " + JSON.stringify(this.itemChildCategoryResponse));
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


