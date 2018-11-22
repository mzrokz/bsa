import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { WebServicesProvider } from "../../services/web.service";
import { CommonService } from '../../services/common.service';
import {Storage} from "@ionic/storage";

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
  sliderImageDataModal: any = [];
  auth_token:any;


  constructor(public navCtrl: NavController, public navParams: NavParams,
    public webservice: WebServicesProvider, public commonService: CommonService, public storage: Storage) {

    this.dataFromPrevious = this.navParams.data.data;
    //  console.log("this.dataFromPrevious ",JSON.stringify(this.dataFromPrevious));
    this.parent_id = this.dataFromPrevious.category_id;
    this.rootCategoryName = this.dataFromPrevious.category_name;


    this.storage.get('auth_token').then(auth_token => {
      this.auth_token = auth_token;
      console.log('Auth token : ' + this.auth_token);
    });

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad SubcategoryPage');
    this.callGetSliderImageDataApi();

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

  callGetSliderImageDataApi() {
    this.commonService.showLoader();
    this.webservice.getCategorySliderImages(this.auth_token).subscribe(responce => {
      this.commonService.hideLoader();
      let resp: any = {};
      resp = JSON.stringify(responce);
      let data = JSON.parse(resp);
      if (data.status === '200') {
        let dataOnlyHere = JSON.stringify(data.data);
        this.sliderImageDataModal = JSON.parse(dataOnlyHere);
      }
    }, (err) => {
      this.commonService.hideLoader();

      let err1: any = err;
      let error = JSON.parse(JSON.stringify(err1));
      console.log('error with status', JSON.stringify(error));

    });
  }
}
