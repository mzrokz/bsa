import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';
import { WebServicesProvider } from "../../services/web.service";
import { Storage } from "@ionic/storage";
import { CommonService } from '../../services/common.service';

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

  constructor(public navCtrl: NavController, public navParams: NavParams, public webservice: WebServicesProvider,
    public commonService: CommonService, public storage: Storage) {

  }

  ionViewDidLoad() {
    // console.log('ionViewDidLoad MainpagePage');
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
    this.webservice.getRootCategory().subscribe(responce => {
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

}
