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
  selector: 'page-recent-posts',
  templateUrl: 'recent-posts.html',
})
export class RecentPostsPage {

  profile: any = {};
  currentUser: any = {};
  posts: any = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private commonService: CommonService,
    private productService: ProductService
  ) {
    this.userService.getCurrentUser().then(user => {
      this.currentUser = user;
      this.getRecentPosts();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecentPostsPage');

  }

  getRecentPosts() {
    this.commonService.showLoader();
    this.currentUser.user_id = 118;
    this.productService.getRecentProducts(this.currentUser.user_id).subscribe(res => {
      this.commonService.hideLoader();
      if (res.status == 200) {
        this.posts = res.data;
      }
    }, error => {
      this.commonService.hideLoader();
    });
  }

  goBack() {
    this.navCtrl.push(ProfilePage);
  }

  openProductDetailPage(product) {
    this.navCtrl.push('ProductdetailscreenPage', { data: product });
  }
}
