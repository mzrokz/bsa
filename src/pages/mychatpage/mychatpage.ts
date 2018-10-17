import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { ChattingScreenPage } from '../chatting-screen/chatting-screen';

@Component({
  selector: 'page-mychatpage',
  templateUrl: 'mychatpage.html',
})
export class MychatpagePage {

  public currentUser: any = {};
  public chats = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chatService: ChatService,
    private userService: UserService,
    private commonService: CommonService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MychatpagePage');
    this.userService.getCurrentUser().then(user => {
      this.currentUser = user;
      this.getChats();
    });
  }

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }

  getChats() {
    this.chatService.getChats(this.currentUser.user_id).subscribe(data => {
      if (data.status == 200) {
        this.chats = data.chat_users;
      }
    });
  }

  gotoChatDetail(chat) {
    this.navCtrl.push(ChattingScreenPage, { recepientId: chat.user_id });
  }
}
