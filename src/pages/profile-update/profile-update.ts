import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { ProfilePage } from '../profile/profile';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin } from 'rxjs/observable/forkJoin';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-profile-update',
  templateUrl: 'profile-update.html',
  providers: [ImagePicker, Base64]
})
export class ProfileUpdatePage {

  profile: any = {};
  currentUser: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserService,
    private commonService: CommonService,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private sanitizer: DomSanitizer,
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfileUpdatePage');
    this.commonService.showLoader();
    this.userService.getCurrentUser().then(user => {
      this.currentUser = user;
      this.getProfile(user.user_id);
    }).catch(() => {
      this.commonService.showToast("Please log in to update Profile");
      this.commonService.hideLoader();
    });
  }

  getProfile(userId) {
    this.userService.getProfile(userId).subscribe(res => {
      this.profile = (res as any).data;
      if (this.profile) {
        this.profile.firstName = this.profile.first_name;
        this.profile.lastName = this.profile.last_name;
      }
      this.commonService.hideLoader();
    }, () => {
      this.commonService.hideLoader();
    });

  }

  goBack() {
    this.navCtrl.setRoot(ProfilePage);
  }

  getPhoto() {
    this.profile.files = [];

    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      let promises = [];
      for (var i = 0; i < results.length; i++) {
        let file: any = {};
        file.path = results[i];
        let promise = this.base64.encodeFile(results[i]);
        this.profile.files.push(file);
        promises.push(promise);
      }

      forkJoin<any>(promises).subscribe(res => {
        res.forEach((file, i) => {
          this.profile.files[i].encodedImg = file;
          this.profile.files[i].imgTag = this.sanitizer.bypassSecurityTrustResourceUrl(this.profile.files[i].encodedImg);
        });
        this.profile.ProfileImage = this.profile.files[0].imgTag;
      });
    }, (err) => {
      console.error(err);
    });
  }

  updateProfile() {
    debugger;
    this.profile.currentUserId = this.currentUser.user_id;
    this.commonService.showLoader();
    this.userService.updateProfile(this.profile).then(res => {
      if (res) {
        this.commonService.hideLoader();
        this.commonService.showToast("Profile Updated Successfully");
        this.navCtrl.setRoot(ProfilePage);
      }
    }, err => {
      console.log(err);
      this.commonService.hideLoader();
    })
  }

}
