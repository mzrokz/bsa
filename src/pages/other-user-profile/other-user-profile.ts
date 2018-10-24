import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { Storage } from "@ionic/storage";

@Component({
  selector: 'page-other-user-profile',
  templateUrl: 'other-user-profile.html',
})
export class OtherUserProfilePage {

  user: any = {};
  currentUser: any = {};
  isFollowing: boolean = false;
  otherUserId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    public storage: Storage
  ) {
    this.otherUserId = this.navParams.get('recepientId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OtherUserProfilePage');
    this.userService.getCurrentUser().then(user => {
      this.currentUser = user;
      this.getProfile();
    });
  }

  getProfile() {
    this.userService.getOtherUserProfile(this.otherUserId).subscribe(res => {
      if (res.status == 200) {
        this.user = res.data;
      }
    });
  }

  goBack() {
    this.navCtrl.pop();
  }

  followUser() {
    if (this.currentUser) {

      let data = {
        current_user_id: this.currentUser.user_id,
        other_user_id: this.user.id
      }
      this.userService.followUser(data).subscribe(res => {
        debugger;
      })
    }
  }

}
