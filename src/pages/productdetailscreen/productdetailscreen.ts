import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Storage} from "@ionic/storage";
import {WebServicesProvider} from "../../services/web.service";
import {CommonService} from "../../services/common.service";
import {SocialSharing} from "@ionic-native/social-sharing";

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
  relatedProductsArray: any = [];
  user_id: any;
  auth_token: any;
  listOfComments: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing,
              public webservice: WebServicesProvider, public loader: CommonService, public storage: Storage) {
    this.dataFromPrevious = this.navParams.data.data;
    // console.log("this.dataFromPrevious ", JSON.stringify(this.dataFromPrevious));

    // this.category_id = this.dataFromPrevious.category_id;
    this.product_id = this.dataFromPrevious.product_id;
    // this.rootCategoryName = this.navParams.data.rootCategoryName;
    this.subCategoryName = this.dataFromPrevious.category_name;
    /*
        this.storage.get('userData').then(data => {

          this.user_id = JSON.parse(data.user_id);

         // this.auth_token = JSON.parse(data.auth_token);
        });*/

    this.storage.get('user_id').then(user_id => {
      console.log('this.userId in storage' + user_id);
      this.user_id = user_id;
    });

  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProductdetailscreenPage');
    this.callGetProductDetailApi();
  }

  callGetProductDetailApi() {
    if (this.product_id != null) {
      this.loader.showLoader();
      this.webservice.getProductDetailData(this.product_id)
        .subscribe(responce => {
          this.loader.hideLoader();
          let resp: any = {};
          resp = JSON.stringify(responce);
          let data = JSON.parse(resp);
          if (data.status === '200') {
            let dataOnlyHere = JSON.stringify(data.data);
            this.productDetailResponse = JSON.parse(dataOnlyHere);
            // let data = JSON.parse(json.data || '{}');

            if (data.related_products && data.related_products.length > 0) {
              let relatedProducts = JSON.stringify(data.related_products);
              this.relatedProductsArray = JSON.parse(relatedProducts);
            }

            if (data.user_comments && data.user_comments.length > 0) {
              let user_comments = JSON.stringify(data.user_comments);
              this.listOfComments = JSON.parse(user_comments);
            }

            console.log("this.productDetailResponse !!!!!!!!! " + JSON.stringify(this.productDetailResponse));
            console.log("this.relatedProductsArray !!!!!!!!! " + JSON.stringify(this.relatedProductsArray));
            console.log("this.listOfComments !!!!!!!!! " + JSON.stringify(this.listOfComments));
            //this.callPostListCommentApi();
          }
        }, (err) => {
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
      this.webservice.postListComments(this.product_id)/*,this.auth_token*/
        .subscribe(responce => {
          this.loader.hideLoader();
          let resp: any = {};
          resp = JSON.stringify(responce);
          let data = JSON.parse(resp);
          if (data.status === '200') {
            let dataOfList = JSON.stringify(data.data);
            this.listOfComments = JSON.parse(dataOfList);
            //console.log("this.listOfComments !!!!!!!!! " + JSON.stringify(this.listOfComments));
          }
        }, (err) => {
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
      this.webservice.postAddComment(this.product_id, this.user_id, this.comments, this.productDetailResponse.price/*,this.auth_token*/)
        .subscribe(response => {
          this.loader.hideLoader();
          let resp: any = {};
          resp = JSON.stringify(response);
          let data = JSON.parse(resp);
          if (data.status === '200') {
            //api call get comment list
            this.comments = '';
            this.callGetProductDetailApi();
          }
        }, (err) => {
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

  shareViaWhatsApp() {
    this.socialSharing.shareViaWhatsApp('I am Sharing this image', this.productDetailResponse.image_uri, '').then(() => {
      // Success!
      alert('Success');
    }).catch((err) => {
      // Error!
      alert(err);
    });
  }

}
