/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   GPL-3.0
 */

import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';
import { RideListPage } from '../pages/ride-list/ride-list';

export interface PageInterface {
  title: string;
  component: any;
  icon: string;
  logsOut?: boolean;
  index?: number;
  tabComponent?: any;
}

@Component({
  templateUrl: 'app.template.html',
})
export class TaxiApp {

  appPages: PageInterface[] = [
    {title: 'Map', component: HomePage, index: 1, icon: 'map'},
    {title: 'Taxi rides', component: RideListPage, index: 2, icon: 'car'},
    {title: 'About', component: AboutPage, index: 3, icon: 'information-circle'},
  ];

  rootPage: any = HomePage;

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) private nav: Nav;

  constructor(private platform: Platform) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      // https://github.com/apache/cordova-plugin-inappbrowser
      // The cordova.InAppBrowser.open() function is defined to be a drop-in replacement for the window.open()
      // function. Existing window.open() calls can use the InAppBrowser window, by replacing window.open:
      if ((<any>window).cordova && (<any>window).cordova.InAppBrowser) {
        window.open = (<any>window).cordova.InAppBrowser.open;
      }
    });
  }

  openPage(page: PageInterface) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    if (page.index) {
      this.nav.setRoot(page.component, { tabIndex: page.index });
    } else {
      this.nav.setRoot(page.component).catch(() => {
        console.log("Didn't set nav root");
      });
    }
  }
}
