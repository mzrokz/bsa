import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }


  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemsubcatgprdctselectedPage');
  }

}
