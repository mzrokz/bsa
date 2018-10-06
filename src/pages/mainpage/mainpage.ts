import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { WebServicesProvider } from "../../providers/web-services/web-services";
import { Constant } from "../../providers/Constant";
import { Storage } from "@ionic/storage";

/**
 * Generated class for the MainpagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-mainpage',
  templateUrl: 'mainpage.html',
})
export class MainpagePage {

  @ViewChild('mySlides') slidesForImage: Slides;
  @ViewChild('categorySlides') slides: Slides;


  rootCategoryResponse: any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public webservice: WebServicesProvider,
    public loader: Constant, public storage: Storage) {

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
    this.loader.showLoader();
    this.webservice.getRootCategory().subscribe(responce => {
      debugger;
      this.loader.hideLoader();
      let resp: any = {};
      resp = JSON.stringify(responce);
      let data = JSON.parse(resp);
      if (data.status === '200') {
        let dataOnlyHere = JSON.stringify(data.data);
        this.rootCategoryResponse = JSON.parse(dataOnlyHere);
      }
    }, (err) => {
      this.loader.hideLoader();

      let err1: any = err;
      let error = JSON.parse(JSON.stringify(err1));
      console.log('error with status', JSON.stringify(error));

    });
  }

}
