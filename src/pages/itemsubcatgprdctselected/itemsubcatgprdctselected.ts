import { Component } from '@angular/core';
import {ModalController, NavController, NavParams} from 'ionic-angular';
import { WebServicesProvider } from "../../services/web.service";
import { CommonService } from '../../services/common.service';
import {FilterModalPage} from "../filter-modal/filter-modal";
import {UserService} from "../../services/user.service";
import {Storage} from "@ionic/storage";

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
  filterResponse:any;
  isApplyFilter:boolean = false;
  isSkipLogin:boolean = false;

  constructor(
    public navCtrl: NavController, public navParams: NavParams, public webservice: WebServicesProvider,
    public commonService: CommonService, public modalCtrl: ModalController, public storage: Storage
  ) {

    this.dataFromPrevious = this.navParams.data.data;
    // console.log("this.dataFromPrevious ", JSON.stringify(this.dataFromPrevious));

    this.category_id = this.dataFromPrevious.category_id;
    this.rootCategoryName = this.navParams.data.rootCategoryName;
    this.subCategoryName = this.dataFromPrevious.category_name;

     this.storage.get('isSkipLogin').then(isSkipLogin => {
      console.log('this.isSkipLogin in storage' + isSkipLogin);
      this.isSkipLogin = isSkipLogin;

    });

  }

  openProductDetailPage(data) {
   /* if(this.isSkipLogin){
      this.commonService.showToast('Please Login In to access this page');
    }else {
      this.navCtrl.push('ProductdetailscreenPage', { data: data })
    } */

      this.navCtrl.push('ProductdetailscreenPage', { data: data })


  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    //  console.log('ionViewDidLoad ItemsubcatgprdctselectedPage');
    if(!this.isApplyFilter){
      this.callGetItemChildCategoryApi();
    }
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
            if(this.itemChildCategoryResponse){
              this.itemChildCategoryResponse = [];
            }
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


  openFilterModal(){
    let filterModal = this.modalCtrl.create(FilterModalPage);
    filterModal.onDidDismiss(data => {
      let filterData = JSON.stringify(data);
      this.filterResponse = JSON.parse(filterData);
      this.isApplyFilter = this.filterResponse.isApplyFilter;

      if(this.filterResponse.filterBy != null && this.filterResponse.filterOrder != null && this.isApplyFilter){
        this.callFilterPostApi(this.filterResponse.filterBy,this.filterResponse.filterOrder);
      }else if(!this.isApplyFilter){
        this.callGetItemChildCategoryApi();
      }

      console.log('filter value is : '  + JSON.stringify(data));
    });
    filterModal.present();
  }


  callFilterPostApi(filterBy,filterOrder){
    if (this.category_id != null) {
      this.commonService.showLoader();
      this.webservice.postFilterApi(this.category_id,filterBy,filterOrder)
        .subscribe(responce => {
          this.commonService.hideLoader();
          let resp: any = {};
          resp = JSON.stringify(responce);
          let data = JSON.parse(resp);
          if (data.status === '200') {
            let dataOnlyHere = JSON.stringify(data.data);
            this.itemChildCategoryResponse = [];
            this.itemChildCategoryResponse = JSON.parse(dataOnlyHere);
            console.log("this.itemChildCategoryResponse !!!!!!!!! " + JSON.stringify(this.itemChildCategoryResponse));
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
