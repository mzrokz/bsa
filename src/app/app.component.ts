import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {Storage} from "@ionic/storage";
import {SliderPage} from "../pages/slider/slider";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
 //  rootPage: any = SliderPage;
  @ViewChild(Nav) navCtrl: Nav;

  rootPage: any;
  user_id: any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public storage: Storage) {

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });

    this.checkSession();
  }

  checkSession() {
    this.storage.get('user_id').then((user_id) => {
      console.log('MyApp : checkSession() : accesstoken from storage is ', user_id);
      if (user_id != null && user_id != '') {
        this.user_id = user_id;
        //user already logged in
        this.rootPage = 'HomePage';
        console.log('user already logged in ');
        //this.navCtrl.setRoot('HomePage');

      } else {
        //user not logged in
        console.log('user not logged in ');
        //this.navCtrl.setRoot('SliderPage');
        this.rootPage = 'SliderPage';
      }
    });
  }
}

