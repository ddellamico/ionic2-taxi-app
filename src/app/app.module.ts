/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2017
 * @license   GPL-3.0
 */

import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { TaxiApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { RideListPage } from '../pages/ride-list/ride-list';
import { ConfirmationPage } from '../pages/confirmation/confirmation';

import { MapComponent } from '../components/map/map';
import { SearchPage } from '../pages/search/search';

import { RideService } from '../providers/ride/ride.service';
import { GeocoderService } from '../providers/map/geocoder.service';
import { MapService } from '../providers/map/map.service';

@NgModule({
  declarations: [
    TaxiApp,
    AboutPage,
    HomePage,
    RideListPage,
    MapComponent,
    SearchPage,
    ConfirmationPage
  ],
  imports: [
    IonicModule.forRoot(TaxiApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    TaxiApp,
    AboutPage,
    HomePage,
    RideListPage,
    SearchPage,
    ConfirmationPage
  ],
  providers: [RideService, GeocoderService, MapService],
})
export class AppModule {
}
