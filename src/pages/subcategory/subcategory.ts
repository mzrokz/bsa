import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebServicesProvider } from "../../services/web.service";
import { CommonService } from '../../services/common.service';

/**
 * Generated class for the SubcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
})
export class SubcategoryPage {

  parent_id: any;
  dataFromPrevious: any;
  rootCategoryName: any;
  childCategoryResponse: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public webservice: WebServicesProvider, public commonService: CommonService) {

    this.dataFromPrevious = this.navParams.data.data;
    //  console.log("this.dataFromPrevious ",JSON.stringify(this.dataFromPrevious));
    this.parent_id = this.dataFromPrevious.category_id;
    this.rootCategoryName = this.dataFromPrevious.category_name;

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SubcategoryPage');
    this.callGetChildCategoryApi();
  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  openItemPage(data) {
    this.navCtrl.push('ItemsubcatgprdctselectedPage', { rootCategoryName: this.rootCategoryName, data: data });
  }

  callGetChildCategoryApi() {
    if (this.parent_id != null) {
      this.commonService.showLoader();
      this.webservice.getChildCategory(this.parent_id)
        .subscribe(responce => {
          this.commonService.hideLoader();
          let resp: any = {};
          resp = JSON.stringify(responce);
          let data = JSON.parse(resp);
          if (data.status === '200') {
            let dataOnlyHere = JSON.stringify(data.data);
            this.childCategoryResponse = JSON.parse(dataOnlyHere);

            // console.log("this.childCategoryResponse !!!!!!!!! " + JSON.stringify(this.childCategoryResponse));
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
