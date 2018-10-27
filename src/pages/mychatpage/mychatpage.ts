import { Component } from '@angular/core';
import { NavController, NavParams, App } from 'ionic-angular';
import { ChatService } from '../../services/chat.service';
import { UserService } from '../../services/user.service';
import { CommonService } from '../../services/common.service';
import { ChattingScreenPage } from '../chatting-screen/chatting-screen';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-mychatpage',
  templateUrl: 'mychatpage.html',
})
export class MychatpagePage {

  public currentUser: any = {};
  public chats = [];
  public filteredChats = [];
  userfilter: string = '';
  showFilter: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private chatService: ChatService,
    private userService: UserService,
    private commonService: CommonService,
    private app: App
  ) {

  }

  ionViewDidLoad() {
    debugger;
    console.log('ionViewDidLoad MychatpagePage');
  }

  ionViewCanEnter(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.userService.getCurrentUser().then(user => {
        resolve(true);
      }).catch(() => {
        resolve(false);
        this.commonService.redirectToHome(this.app);
      });
    })
  }

  ionViewDidEnter() {
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
        this.filteredChats = data.chat_users;
      }
    });
  }

  gotoChatDetail(chat) {
    this.navCtrl.push(ChattingScreenPage, { recepientId: chat.user_id });
  }

  filterUsers() {
    if (this.userfilter && this.userfilter != '') {
      this.filteredChats = this.chats.filter(chat => {
        let test = chat.name.includes(this.userfilter);
        return test;
      });
    } else {
      this.filteredChats = this.chats;
    }

  }
}
