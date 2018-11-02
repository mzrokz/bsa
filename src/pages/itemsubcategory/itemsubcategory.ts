import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItemsubcategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-itemsubcategory',
  templateUrl: 'itemsubcategory.html',
})
export class ItemsubcategoryPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsubcategoryPage');
  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  openItemsubcatgprdctselectedPage() {
    this.navCtrl.push('ItemsubcatgprdctselectedPage');
  }

}
