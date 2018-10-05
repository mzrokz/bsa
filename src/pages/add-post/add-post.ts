import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
})
export class AddPostPage {

  isSaveSelected: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPostPage');
  }

  save() {
    if (this.isSaveSelected) {
      this.isSaveSelected = false;
    } else {
      this.isSaveSelected = true;
    }
  }
}
