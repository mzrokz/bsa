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

@NgModule({
  declarations: [
    MyApp,
    SliderPage,
    AboutPage,
    ContactPage,
    TabsPage,
    SettingsPage,
    SettingsModalPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp, {
      statusbarPadding: true,
    },
      {
        links: [
          { component: SettingsPage, name: 'SettingsPage', segment: 'settings' },
          { component: SettingsModalPage, name: 'SettingsModalPage', segment: 'settings-modal' },
        ]
      }
    )
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SliderPage,
    AboutPage,
    ContactPage,
    TabsPage,
    SettingsPage,
    SettingsModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    UserService,
    CommonService
  ]
})
export class AppModule { }
