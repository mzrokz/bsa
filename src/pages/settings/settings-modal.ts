import { IonicPage, Platform, NavParams, ViewController } from "ionic-angular";
import { Component } from "@angular/core";



@Component({
    selector: 'settings-modal',
    templateUrl: 'settings-modal.html',
})
export class SettingsModalPage {
    character;
    settings: any = {};

    constructor(
        public platform: Platform,
        public params: NavParams,
        public viewCtrl: ViewController
    ) {

        this.settings = this.params.get('settings');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}