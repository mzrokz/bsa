import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProfileService {

    constructor(
        private http: HttpClient
    ) { }

    getProfile(userId) {
        return this.http.get('http://4auctions.net/api/profile.php?user_id=' + userId);
    }
}