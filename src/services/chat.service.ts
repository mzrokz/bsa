import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonService } from './common.service';

@Injectable()
export class ChatService {

    constructor(
        private http: HttpClient,
        private commonService: CommonService
    ) { }

    getChats(userId) {
        let payload = this.commonService.prepareFormData({ user_id: userId });
        return this.http.post<any>(this.commonService.baseUrl + 'get-chat-users.php', payload);
    }

    getChatMessages(users) {
        let payload = this.commonService.prepareFormData(users);
        return this.http.post<any>(this.commonService.baseUrl + 'get-chat.php', payload);
    }

    sendMessage(msgData) {
        let payload = this.commonService.prepareFormData(msgData);
        return this.http.post<any>(this.commonService.baseUrl + 'add-chat.php', payload);
    }
}