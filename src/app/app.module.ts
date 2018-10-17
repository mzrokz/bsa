import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { SliderPage } from "../pages/slider/slider";
import { UserService } from '../services/user.service';
import { CommonService } from '../services/common.service';
import { SettingsPage } from '../pages/settings/settings';
import { SettingsModalPage } from '../pages/settings/settings-modal';
import { AddPostPage } from '../pages/add-post/add-post';
import { ByProductPage } from '../pages/by-product/by-product';
import { ChattingScreenPage } from '../pages/chatting-screen/chatting-screen';
import { HomePage } from '../pages/home/home';
import { ItemsubcategoryPage } from '../pages/itemsubcategory/itemsubcategory';
import { ItemsubcatgprdctselectedPage } from '../pages/itemsubcatgprdctselected/itemsubcatgprdctselected';
import { LoginPage } from '../pages/login/login';
import { MainpagePage } from '../pages/mainpage/mainpage';
import { MychatpagePage } from '../pages/mychatpage/mychatpage';
import { NotificationsPage } from '../pages/notifications/notifications';
import { OtherUserProfilePage } from '../pages/other-user-profile/other-user-profile';
import { PostProductPage } from '../pages/post-product/post-product';
import { ProfilePage } from '../pages/profile/profile';
import { SubcategoryPage } from '../pages/subcategory/subcategory';
import { VerificationPage } from '../pages/verification/verification';
import { ProductService } from '../services/product.service';

import { IonicStorageModule } from '@ionic/storage';
import { Toast } from "@ionic-native/toast";

import { WebServicesProvider } from '../services/web.service';
import { SignupPage } from '../pages/signup/signup';
import { ProductdetailscreenPage } from "../pages/productdetailscreen/productdetailscreen";

import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { SocialSharing } from "@ionic-native/social-sharing";
import { SearchPage } from "../pages/search/search";
import { FilterModalPage } from "../pages/filter-modal/filter-modal";
import { ChatService } from '../services/chat.service';

@NgModule({
  declarations: [
    MyApp,
    SliderPage,
    AboutPage,
    AddPostPage,
    ByProductPage,
    ChattingScreenPage,
    ContactPage,
    HomePage,
    ItemsubcategoryPage,
    ItemsubcatgprdctselectedPage,
    LoginPage,
    MainpagePage,
    MychatpagePage,
    NotificationsPage,
    OtherUserProfilePage,
    PostProductPage,
    ProfilePage,
    SubcategoryPage,
    TabsPage,
    VerificationPage,
    SettingsPage,
    SettingsModalPage,
    SignupPage,
    ProductdetailscreenPage,
    SearchPage,
    FilterModalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {
      statusbarPadding: true,
    },
      {
        links: [
          { component: SettingsPage, name: 'SettingsPage', segment: 'settings' },
          { component: SettingsModalPage, name: 'SettingsModalPage', segment: 'settings-modal' },
          { component: AboutPage, name: 'AboutPage', segment: 'about' },
          { component: AddPostPage, name: 'AddPostPage', segment: 'add-post' },
          { component: ByProductPage, name: 'ByProductPage', segment: 'by-product' },
          { component: ChattingScreenPage, name: 'ChattingScreenPage', segment: 'chatting-screen' },
          { component: ContactPage, name: 'ContactPage', segment: 'contact' },
          { component: HomePage, name: 'HomePage', segment: 'home' },
          { component: ItemsubcategoryPage, name: 'ItemsubcategoryPage', segment: 'item-sub-category' },
          { component: ItemsubcatgprdctselectedPage, name: 'ItemsubcatgprdctselectedPage', segment: 'itemsubcatgprdctselected' },
          { component: LoginPage, name: 'LoginPage', segment: 'login' },
          { component: MainpagePage, name: 'MainpagePage', segment: 'main' },
          { component: MychatpagePage, name: 'MychatpagePage', segment: 'chat' },
          { component: NotificationsPage, name: 'NotificationsPage', segment: 'notifications' },
          { component: OtherUserProfilePage, name: 'OtherUserProfilePage', segment: 'other-user-profile' },
          { component: PostProductPage, name: 'PostProductPage', segment: 'post-product' },
          { component: ProfilePage, name: 'ProfilePage', segment: 'profile' },
          { component: SliderPage, name: 'SliderPage', segment: 'slider' },
          { component: SubcategoryPage, name: 'SubcategoryPage', segment: 'sub-category' },
          { component: SignupPage, name: 'SignupPage', segment: 'signup' },
          { component: VerificationPage, name: 'VerificationPage', segment: 'verification' },
          { component: ProductdetailscreenPage, name: 'ProductdetailscreenPage', segment: 'product-detail-screen' },
          { component: SearchPage, name: ' SearchPage', segment: 'search-screen' },
          { component: FilterModalPage, name: ' FilterModalPage', segment: 'filter-modal' }
        ]
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SliderPage,
    AboutPage,
    AddPostPage,
    ByProductPage,
    ChattingScreenPage,
    ContactPage,
    HomePage,
    ItemsubcategoryPage,
    ItemsubcatgprdctselectedPage,
    LoginPage,
    MainpagePage,
    MychatpagePage,
    NotificationsPage,
    OtherUserProfilePage,
    PostProductPage,
    ProfilePage,
    SubcategoryPage,
    TabsPage,
    VerificationPage,
    SettingsPage,
    SettingsModalPage,
    SignupPage,
    ProductdetailscreenPage,
    SearchPage,
    FilterModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    CommonService,
    ProductService,
    Toast,
    WebServicesProvider,
    FileTransfer,
    FileTransferObject,
    SocialSharing,
    ChatService
  ]
})
export class AppModule { }
