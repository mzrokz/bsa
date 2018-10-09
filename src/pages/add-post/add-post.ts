import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ImagePicker } from '@ionic-native/image-picker';
import { Base64 } from '@ionic-native/base64';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonService } from '../../services/common.service';
import { WebServicesProvider } from '../../services/web.service';
import { ProductService } from '../../services/product.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-add-post',
  templateUrl: 'add-post.html',
  providers: [ImagePicker, Base64]
})
export class AddPostPage {

  isSaveSelected: boolean = false;

  regData = { avatar: '', email: '', password: '', fullname: '' };
  imgPreview;

  post: any;
  allCategories: any;
  subCategories: any;
  currentUser: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private imagePicker: ImagePicker,
    private base64: Base64,
    private sanitizer: DomSanitizer,
    private commonService: CommonService,
    private webService: WebServicesProvider,
    private productService: ProductService,
    private storage: Storage

  ) {
    this.preparePostObject();
    this.storage.get('userData').then(data => {
      this.currentUser = JSON.parse(data);
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddPostPage');
    this.getAllCatrgories();
  }

  ionViewDidEnter() {
    this.preparePostObject();
  }

  preparePostObject() {
    this.post = {
      files: []
    };
    this.post.categoryId = null;
    this.post.subcategoryId = null;
    this.post.title = null;
    this.post.description = null;
    this.post.mobile = null;
  }

  getAllCatrgories() {
    this.webService.getAllCategory().subscribe(res => {
      if (res.status == 200) {
        this.allCategories = res.data;
      }
    })
  }

  onCategoryChange(e) {
    this.getAllSubCatrgories(this.post.categoryId);
  }

  getAllSubCatrgories(categoryId) {
    if (categoryId) {
      this.commonService.showLoader();
      this.webService.getChildCategory(categoryId).subscribe(res => {
        if (res.status == 200) {
          this.subCategories = res.data;
          this.commonService.hideLoader();
        }
      }, (err) => {
        this.commonService.hideLoader();
        console.error(err);
      });
    }
  }

  addPost() {
    // if (!this.post.categoryId) {
    //   this.commonService.showToast("Please select category");
    //   return;
    // }
    // if (!this.post.subcategoryId) {
    //   this.commonService.showToast("Please select category");
    //   return;
    // }
    // if (!this.post.title) {
    //   this.commonService.showToast("Please select title");
    //   return;
    // }
    // if (!this.post.mobile) {
    //   this.commonService.showToast("Please select mobile");
    //   return;
    // }

    if (this.currentUser) {
      this.post.currentUserId = this.currentUser.user_id;
    }

    this.commonService.showLoader();
    this.productService.addProduct(this.post)
      .then((data) => {
        console.log(data);
        if (data) {
          this.commonService.showToast("Product Uploaded Successfully");
        } else {
          this.commonService.showToast("Some error occurred");
        }
        this.commonService.hideLoader();
        this.preparePostObject();
      }, (err) => {
        console.error(err);
        this.commonService.hideLoader();
        this.preparePostObject();
      });
  }


  getPhoto() {
    let that = this;
    this.post.files = [];
    let file: any = {};

    let options = {
      maximumImagesCount: 1
    };
    this.imagePicker.getPictures(options).then((results) => {
      for (var i = 0; i < results.length; i++) {
        file.path = results[i];
        this.base64.encodeFile(results[i]).then((base64File: string) => {
          file.encodedImg = base64File;
          file.imgTag = this.sanitizer.bypassSecurityTrustResourceUrl(file.encodedImg);
          that.post.files.push(file);
        }, (err) => {
          console.log(err);
        });
      }
    }, (err) => { });
  }


}
