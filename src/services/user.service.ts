import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable()
export class UserService {

    constructor(
        private http: HttpClient,
        private commonService: CommonService
    ) { }

    getProfile(userId) {
        return this.http.get<any>(this.commonService.baseUrl + 'profile.php?user_id=' + userId);
    }

    getSettings(userId) {
        return this.http.get<any>(this.commonService.baseUrl + 'get-setting.php?user_id=' + userId);
    }

    updateSettings(settings) {
        return this.http.post<any>(this.commonService.baseUrl + 'update-setting.php', settings);
    }
}