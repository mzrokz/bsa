import {AlertController, LoadingController} from "ionic-angular";
import {Injectable} from "@angular/core";
import {Toast} from "@ionic-native/toast";

@Injectable()
export class Constant{

  public loading: any;

  constructor(public loadingCtrl: LoadingController,public alertCtrl: AlertController, private toast: Toast){

  }

  public showLoader(){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  public hideLoader(){
    this.loading.dismiss();
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
      }
    );
  }
}
