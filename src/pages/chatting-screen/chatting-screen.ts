import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonService } from '../../services/common.service';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';

@Component({
  selector: 'page-chatting-screen',
  templateUrl: 'chatting-screen.html',
})
export class ChattingScreenPage {

  currentUser: any = {};
  otherUser: any = {};
  otherUserId: any = null;

  chats = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private commonService: CommonService,
    private userService: UserService,
    private chatService: ChatService
  ) {

    this.otherUserId = this.navParams.get('recepientId');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChattingScreenPage');

    this.userService.getCurrentUser().then(user => {
      this.currentUser = user;
      debugger;
      this.getotherUserProfile();
      this.getChats();
    })
  }

  getotherUserProfile() {
    this.userService.getOtherUserProfile(this.otherUserId).subscribe(res => {
      this.otherUser = res.data;
    });
  };

  getChats() {
    debugger;
    let data = {
      user1: this.currentUser.user_id,
      user2: this.otherUserId
    }
    this.chatService.getChatMessages(data).subscribe(res => {
      debugger;

    });
  };

  sendMessage() {
    let data = {
      user1: this.currentUser.user_id,
      user2: this.otherUserId,
      message: "Hello, test",
      message_by: this.currentUser.user_id,
    };

    this.chatService.sendMessage(data).subscribe(res => {
      debugger;
    });
  };

  backtoPreviousScreen() {
    this.navCtrl.pop();
  }
}
