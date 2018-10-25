import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { ProfilePage } from '../profile/profile';
import { ProductService } from '../../services/product.service';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-ads',
  templateUrl: 'ads.html'
})
export class AdsPage {

  profile: any = {};
  currentUser: any = {};
  posts = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private commonService: CommonService,
    private productService: ProductService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdsPage');
    this.userService.getCurrentUser().then(user => {
      this.currentUser = user;
      this.commonService.showLoader();
      this.productService.getPostProducts(this.currentUser.user_id).subscribe(res => {
        if (res.status == 200) {
          this.posts = res.data;
        }
        this.commonService.hideLoader();
      });
    })

  }

  goBack() {
    this.navCtrl.push(ProfilePage);
  }

  openProductDetailPage(product) {
    this.navCtrl.push('ProductdetailscreenPage', { data: product });
  }
}
