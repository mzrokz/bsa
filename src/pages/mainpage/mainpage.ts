import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides, App } from 'ionic-angular';
import { WebServicesProvider } from "../../services/web.service";
import { Storage } from "@ionic/storage";
import { CommonService } from '../../services/common.service';
import { SearchPage } from "../search/search";
import { LoginPage } from '../login/login';
import { UserService } from '../../services/user.service';

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
  auth_token: any;
  isLoggedIn: boolean = false;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public webservice: WebServicesProvider,
    public commonService: CommonService,
    public storage: Storage,
    private userService: UserService,
    private app: App
  ) {
    this.storage.get('auth_token').then(auth_token => {
      this.auth_token = auth_token;
      console.log('Auth token : ' + this.auth_token);
    });

    this.userService.getCurrentUser().then(user => {
      this.isLoggedIn = true;
    }, err => {
      this.isLoggedIn = false;
    });
  }

  ionViewDidLoad() {
    // this.callGetRootCategoryApi();
    this.callGetCategoriesWithSubCategory();
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
      this.callGetSliderImageDataApi();
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

  callGetCategoriesWithSubCategory() {
    this.commonService.showLoader();
    this.webservice.getCategoriesWithSubCategory(this.auth_token).subscribe(responce => {
      this.commonService.hideLoader();
      let resp: any = {};
      resp = JSON.stringify(responce);
      let data = JSON.parse(resp);
      if (data.status === '200') {
        let dataOnlyHere = JSON.stringify(data.data);
        this.rootCategoryResponse = JSON.parse(dataOnlyHere);
        console.log('rootCategoryResponse>>>>>>>>>>>>>>>>>>',JSON.stringify(this.rootCategoryResponse));
      }
      this.callGetSliderImageDataApi();
    }, (err) => {
      this.commonService.hideLoader();

      let err1: any = err;
      let error = JSON.parse(JSON.stringify(err1));
      console.log('error with status', JSON.stringify(error));

    });
  }

  openSearchScreen() {
    this.navCtrl.push(SearchPage);
  }

  gotoLogin() {
    this.userService.logoutUser(this.app.getRootNav());
  }

}
