import { Component, ViewChild } from '@angular/core';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { ionicBootstrap, Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from './pages/home/home';
import { AboutPage } from './pages/about/about';
import { RideService } from './providers/ride/ride.service';
import { RideListPage } from './pages/ride-list/ride-list';
import { GeocoderService } from './providers/map/geocoder.service';
import { MapService } from './providers/map/map.service';

@Component({
  template: require('./app.html')
})
export class TaxiApp {

  appPages: PageObj[] = [
    {title: 'Map', component: HomePage, index: 1, icon: 'map'},
    {title: 'Taxi rides', component: RideListPage, index: 2, icon: 'car'},
    {title: 'About', component: AboutPage, index: 3, icon: 'information-circle'}
  ];

  rootPage: any = HomePage;

  // the root nav is a child of the root app component
  // @ViewChild(Nav) gets a reference to the app's root nav
  @ViewChild(Nav) private nav: Nav;

  constructor(private platform: Platform) {
    // Call any initial plugins when ready
    platform.ready().then(() => {
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

  openPage(page: PageObj) {
    // the nav component was found using @ViewChild(Nav)
    // reset the nav to remove previous pages and only have this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}

ionicBootstrap(TaxiApp, [MapService, GeocoderService, RideService, HTTP_PROVIDERS,
  disableDeprecatedForms(), // disable deprecated forms
  provideForms(), // enable new forms module
], {});
