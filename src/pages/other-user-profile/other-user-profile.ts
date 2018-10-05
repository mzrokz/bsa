import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'page-other-user-profile',
  templateUrl: 'other-user-profile.html',
})
export class OtherUserProfilePage {

  user: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherUserProfilePage');
    this.getProfile();
  }

  getProfile() {
    // TODO : UserId
    this.userService.getOtherUserProfile(118).subscribe(res => {
      if (res.status == 200) {
        this.user = res.data;
      }
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

}
