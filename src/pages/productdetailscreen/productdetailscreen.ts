import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from "@ionic/storage";
import {WebServicesProvider} from "../../services/web.service";
import {CommonService} from "../../services/common.service";

/**
 * Generated class for the ProductdetailscreenPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-productdetailscreen',
  templateUrl: 'productdetailscreen.html',
})
export class ProductdetailscreenPage {

  comments: any = '';
  product_id: any;
  category_id: any;
  dataFromPrevious: any;
  subCategoryName: any;
  rootCategoryName: any;
  productDetailResponse: any = [];
  user_id: any;
  listOfComments: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public webservice: WebServicesProvider, public loader: CommonService, public storage: Storage) {
    this.dataFromPrevious = this.navParams.data.data;
    // console.log("this.dataFromPrevious ", JSON.stringify(this.dataFromPrevious));

    // this.category_id = this.dataFromPrevious.category_id;
    this.product_id = this.dataFromPrevious.product_id;
    // this.rootCategoryName = this.navParams.data.rootCategoryName;
    this.subCategoryName = this.dataFromPrevious.category_name;

    this.storage.get('userData').then(data => {

      this.user_id = JSON.parse(data.user_id);
    });
  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductdetailscreenPage');
    this.callGetProductDetailApi();
  }

  change() {

  }

  callGetProductDetailApi() {
    debugger;
    if (this.product_id != null) {
      this.loader.showLoader();
      this.webservice.getProductDetailData(this.product_id)
        .subscribe(responce => {
          debugger;
          this.loader.hideLoader();
          let resp: any = {};
          resp = JSON.stringify(responce);
          let data = JSON.parse(resp);
          if (data.status === '200') {
            debugger;
            let dataOnlyHere = JSON.stringify(data.data);
            this.productDetailResponse = JSON.parse(dataOnlyHere);
            // console.log("this.productDetailResponse !!!!!!!!! " + JSON.stringify(this.productDetailResponse));
            this.callPostListCommentApi();
          }
        },(err) => {
          this.loader.hideLoader();

          let err1: any = err;
          let error = JSON.parse(JSON.stringify(err1));
          console.log('error with status', JSON.stringify(error));

        });
    }
  }

  callPostListCommentApi() {
    if (this.product_id != null) {
      this.loader.showLoader();
      this.webservice.postListComments(this.product_id)
        .then(responce => {
          this.loader.hideLoader();
          let resp: any = {};
          resp = JSON.stringify(responce);
          let data = JSON.parse(resp);
          if (data.status === 'true') {
            let dataOfList = JSON.stringify(data.data);
            this.listOfComments = JSON.parse(dataOfList);
            //console.log("this.listOfComments !!!!!!!!! " + JSON.stringify(this.listOfComments));
          }
        }).catch(err => {
          this.loader.hideLoader();
          let err1: any = err;
          let error = JSON.parse(JSON.stringify(err1));
          console.log('error with status', JSON.stringify(error));
        });
    }
  }

  addComment() {
    if (this.comments == null || this.comments == '') {
      this.loader.showToast('Please enter a comment');// todo need to uncomment on build
      //console.log('comment is null');
      return;
    }

    if (this.product_id != null && this.user_id != null && this.comments != null) {
      this.loader.showLoader();
      this.webservice.postAddComment(this.product_id, this.user_id, this.comments)
        .subscribe(response => {
          this.loader.hideLoader();
          let resp: any = {};
          resp = JSON.stringify(response);
          let data = JSON.parse(resp);
          if (data.status === 'true') {
            //api call get comment list
            this.comments = '';
            this.callPostListCommentApi();
          }
        },(err) => {
          this.loader.hideLoader();

          let err1: any = err;
          let error = JSON.parse(JSON.stringify(err1));
          console.log('error with status', JSON.stringify(error));

        });
    }
  }

  openMyChat() {
    //this.navCtrl.push('MychatpagePage',{user_id:this.user_id});

    // this.navCtrl.setRoot('HomePage', {tab: 1, page: 'myChat'});
  }

}
