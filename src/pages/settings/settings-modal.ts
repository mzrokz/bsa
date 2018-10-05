import { Platform, NavParams, ViewController } from "ionic-angular";
import { Component } from "@angular/core";
import { CommonService } from "../../services/common.service";
import { UserService } from "../../services/user.service";



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
        public viewCtrl: ViewController,
        private commonService: CommonService,
        private userService: UserService
    ) {

        this.settings = this.params.get('settings');
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }

    updateSettings() {
        this.commonService.showLoader('Updating Settings');
        this.userService.updateSettings(this.settings).subscribe(res => {
            this.commonService.hideLoader();
            this.dismiss();
        }, error => {
            console.log(error);
            this.commonService.hideLoader();
        });
    }
}