import { Injectable } from '@angular/core';
import { LoadingController, Loading, AlertController } from 'ionic-angular';
import { HttpParams } from '@angular/common/http';
import { Toast } from '@ionic-native/toast';
import { UserService } from './user.service';
import { HomePage } from '../pages/home/home';
import { Storage } from '@ionic/storage';


@Injectable()
export class CommonService {

    public baseUrl: string = "http://4auctions.net/api/";
    public loader: Loading;
    private loaderContent: string = "Please wait...";

    constructor(
        public loadingCtrl: LoadingController,
        public alertCtrl: AlertController,
        private toast: Toast,
        private storage: Storage
    ) {

    }

    showLoader(title?: string) {
        this.loader = this.loadingCtrl.create({
            dismissOnPageChange: true
        });
        if (title) {
            this.loader.setContent(title);
        } else {
            this.loader.setContent(this.loaderContent);
        }
        this.loader.present();
    }

    hideLoader() {
        this.loader.dismiss();
    }

    prepareFormData(payload) {
        let params = new HttpParams();
        Object.keys(payload).forEach(f => {
            params = params.append(f, payload[f]);
        })
        return params;
    }

    showPopUp(title: string, msg: string) {
        const alert = this.alertCtrl.create({
            title: title,
            subTitle: msg,
            buttons: ['Ok']
        });
        alert.present();
    }

    //Toast Method
    showToast(msg: string) {
        this.toast.show(msg, 'short', 'bottom').subscribe(toast => {
        });
    }

    redirectToHome(app) {
        this.showToast("Please log In to access this page");
        let nav = app.getRootNav();
        nav.setRoot(HomePage);
    }
}