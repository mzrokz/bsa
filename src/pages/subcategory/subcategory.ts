import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {WebServicesProvider} from "../../providers/web-services/web-services";
import {Constant} from "../../providers/Constant";

/**
 * Generated class for the SubcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-subcategory',
  templateUrl: 'subcategory.html',
})
export class SubcategoryPage {

  parent_id:any;
  dataFromPrevious:any;
  rootCategoryName:any;
  childCategoryResponse : any =[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
              public webservice: WebServicesProvider, public loader: Constant) {

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
    this.navCtrl.push('ItemsubcatgprdctselectedPage',{rootCategoryName:this.rootCategoryName,data:data});
  }

  callGetChildCategoryApi() {
    if(this.parent_id != null){
      this.loader.showLoader();
      this.webservice.getChildCategory(this.parent_id)
        .then(responce => {
          this.loader.hideLoader();
          let resp: any = {};
          resp = JSON.stringify(responce);
          let data = JSON.parse(resp);
          if (data.status === '200') {
            let dataOnlyHere = JSON.stringify(data.data);
            this.childCategoryResponse = JSON.parse(dataOnlyHere);

           // console.log("this.childCategoryResponse !!!!!!!!! " + JSON.stringify(this.childCategoryResponse));
          }

        }).catch(err => {
        this.loader.hideLoader();

        let err1: any = err;
        let error = JSON.parse(JSON.stringify(err1));
        console.log('error with status', JSON.stringify(error));

      });
    }

  }
}
