import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';
import { Storage } from '@ionic/storage';
import { NavController } from 'ionic-angular';
import { LoginPage } from '../pages/login/login';
import { FileTransferObject, FileUploadOptions, FileTransfer } from '@ionic-native/file-transfer';
import { forkJoin } from 'rxjs/observable/forkJoin';

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient,
        private commonService: CommonService,
        private storage: Storage,
        private transfer: FileTransfer
    ) { }

    getCurrentUser() {
        return new Promise<any>((resolve, reject) => {
            this.storage.get('userData').then(data => {
                let currentUser = JSON.parse(data);
                if (currentUser) {
                    resolve(currentUser);
                } else {
                    reject("User not found");
                }
            }).catch(err => {
                reject(err);
            });
        })
    }

    getProfile(userId) {
        return this.http.get<any>(this.commonService.baseUrl + 'profile.php?user_id=' + userId);
    }

    getSettings(userId) {
        return this.http.get<any>(this.commonService.baseUrl + 'get-setting.php?user_id=' + userId);
    }

    updateSettings(settings) {
        let params = this.commonService.prepareFormData(settings);
        return this.http.post<any>(this.commonService.baseUrl + 'update-setting.php', params);
    }

    getOtherUserProfile(userId) {
        let params = this.commonService.prepareFormData({ user_id: userId });
        return this.http.post<any>(this.commonService.baseUrl + 'get-other-user-profile.php', params);
    }

    followUser(users) {
        let payload = this.commonService.prepareFormData(users);
        return this.http.post<any>(this.commonService.baseUrl + 'add-follow-user.php', payload);
    }

    updateProfile(profile) {
        debugger;
        const fileTransfer: FileTransferObject = this.transfer.create();
        let options: FileUploadOptions = {
            fileKey: 'file',
            fileName: 'product.jpeg',
            chunkedMode: false,
            mimeType: "image/jpeg",
        }

        let newPromise = new Promise<any>((resolve, reject) => {
            fileTransfer.upload(profile.files[0].path, this.commonService.baseUrl + 'file.php', options).then(data => {
                let res = JSON.parse(data.response);

                let params = this.commonService.prepareFormData({
                    user_id: profile.currentUserId,
                    first_name: profile.currentUserId,
                    last_name: profile.currentUserId,
                    image_id: res.image_id[0],
                });

                this.http.post<any>(this.commonService.baseUrl + 'update-user.php', params).subscribe(res => {
                    if (res.status == 200) {
                        resolve(true);
                    } else {
                        resolve(false);
                    }
                }, err => {
                    reject(err);
                });
            }).catch(err => {
                reject(err);
            })
        });
        return newPromise;
    }

    logoutUser(nav) {
        this.storage.clear();
        nav.setRoot(LoginPage);
    }
}