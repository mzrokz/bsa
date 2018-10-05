import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-mychatpage',
  templateUrl: 'mychatpage.html',
})
export class MychatpagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MychatpagePage');
  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }
}
