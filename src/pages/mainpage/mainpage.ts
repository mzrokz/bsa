import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { WebServicesProvider } from "../../services/web.service";
import { Storage } from "@ionic/storage";
import { CommonService } from '../../services/common.service';
import {SearchPage} from "../search/search";

/**
 * Generated class for the MainpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-mainpage',
  templateUrl: 'mainpage.html',
})
export class MainpagePage {

  @ViewChild('mySlides') slidesForImage: Slides;
  @ViewChild('categorySlides') slides: Slides;


  rootCategoryResponse: any = [];
  sliderImageDataModal: any = [];
  auth_token:any;


  constructor(public navCtrl: NavController, public navParams: NavParams, public webservice: WebServicesProvider,
    public commonService: CommonService, public storage: Storage) {


    this.storage.get('auth_token').then(auth_token => {
      this.auth_token = auth_token;
      console.log('Auth token : ' + this.auth_token);
    });
  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MainpagePage');
    this.callGetSliderImageDataApi();
    this.callGetRootCategoryApi();
  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  openSubCategoryScreen(data) {
    this.navCtrl.push('SubcategoryPage', { data: data });
  }

  callGetRootCategoryApi() {
    this.commonService.showLoader();
    this.webservice.getRootCategory(this.auth_token).subscribe(responce => {
      this.commonService.hideLoader();
      let resp: any = {};
      resp = JSON.stringify(responce);
      let data = JSON.parse(resp);
      if (data.status === '200') {
        let dataOnlyHere = JSON.stringify(data.data);
        this.rootCategoryResponse = JSON.parse(dataOnlyHere);
      }
    }, (err) => {
      this.commonService.hideLoader();

      let err1: any = err;
      let error = JSON.parse(JSON.stringify(err1));
      console.log('error with status', JSON.stringify(error));

    });
  }

  callGetSliderImageDataApi() {
    this.commonService.showLoader();
    this.webservice.getHomeSliderImages(this.auth_token).subscribe(responce => {
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


  openSearchScreen(){
    this.navCtrl.push(SearchPage);
  }


  
}
