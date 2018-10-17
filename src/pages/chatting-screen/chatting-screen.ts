import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { CommonService } from '../../services/common.service';
import { UserService } from '../../services/user.service';
import { ChatService } from '../../services/chat.service';
import { MychatpagePage } from '../mychatpage/mychatpage';

@Component({
  selector: 'page-chatting-screen',
  templateUrl: 'chatting-screen.html',
})
export class ChattingScreenPage {

  currentUser: any = {};
  otherUser: any = {};
  otherUserId: any = null;
  userImages: any = {};

  chats = [];
  chatMsg: string = '';

  intervalId: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private commonService: CommonService,
    private userService: UserService,
    private chatService: ChatService
  ) {
    this.otherUserId = this.navParams.get('recepientId');
    this.otherUserId = 128;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChattingScreenPage');
    this.userService.getCurrentUser().then(user => {
      this.currentUser = user;
      this.getotherUserProfile();
      this.getChats();
    });
  }

  ionViewDidEnter() {
    this.getChats();
    this.startInterval();
  }

  getotherUserProfile() {
    this.commonService.showLoader();
    this.userService.getOtherUserProfile(this.otherUserId).subscribe(res => {
      if (res.status == 200) {
        this.otherUser = res.data;
        this.startInterval();
      }
    }, err => {
      this.commonService.hideLoader();
    });
  };

  startInterval() {
    this.stopInterval();
    this.intervalId = setInterval(s => {
      this.getChats();
    }, 5000);
  }

  stopInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  getChats() {
    let data = {
      user1: this.currentUser.user_id,
      user2: this.otherUserId
    }
    this.chatService.getChatMessages(data).subscribe(res => {
      // debugger;
      this.commonService.hideLoader();
      if (res.status = 200) {
        let chats = res.data;
        this.userImages = res.image_data;

        if (chats && chats.length > 0) {
          chats.forEach(chat => {
            this.setUserImage(chat);
          });
          this.chats = chats;
        }
      }
    }, err => {
      this.commonService.hideLoader();
    });
  };

  setUserImage(chat) {
    if (chat.user1 == this.currentUser.user_id) {
      chat.userImg = this.userImages.user1_image;
      chat.direction = "left";
    } else {
      chat.userImg = this.userImages.user2_image;
      chat.direction = "right";
    }
  }

  sendMessage() {
    debugger;
    if (this.chatMsg && this.chatMsg != '') {
      if (this.currentUser.user_id && this.otherUserId) {
        let data = {
          user1: this.currentUser.user_id,
          user2: this.otherUserId,
          message: this.chatMsg,
          message_by: this.currentUser.user_id,
        };

        this.chatMsg = '';
        this.chatService.sendMessage(data).subscribe(res => {
          if (res.status == 200) {
            this.getChats();
          }
        });
      }
    }
  };

  backtoPreviousScreen() {
    this.navCtrl.setRoot(MychatpagePage);
  }

  ngOnDestroy() {
    this.stopInterval();
  }
}
