import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { HttpParams } from '@angular/common/http';


@Injectable()
export class CommonService {

    public baseUrl: string = "http://4auctions.net/api/";
    public loader: Loading;
    private loaderContent: string = "Please wait...";
    constructor(
        public loadingCtrl: LoadingController
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
            debugger;
            params = params.append(f, payload[f]);
        })
        return params;
    }
}