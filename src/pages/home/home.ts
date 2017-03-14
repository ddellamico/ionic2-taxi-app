/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map';
import { Vibration } from 'ionic-native';
import { MapService } from '../../providers/map/map.service';
import { LoadingController, AlertController, ModalController, NavController, Platform } from 'ionic-angular';
import { GeocoderService } from '../../providers/map/geocoder.service';
import { SearchPage } from '../search/search';
import { ConfirmationPage } from '../confirmation/confirmation';
import { BasePage } from '../base-page';

@Component({
  templateUrl: 'home.tpl.html'
})
export class HomePage extends BasePage {

  localized: boolean = false;

  constructor(private platform: Platform,
              private nav: NavController,
              private geocoderService: GeocoderService,
              private mapService: MapService,
              private modalCtrl: ModalController,
              private loadingCtrl: LoadingController,
              protected alertCtrl: AlertController) {
    super(alertCtrl);
  }

  /***
   * This event is fired when map has fully loaded
   */
  onMapReady(): Promise<any> {
    // I must wait platform.ready() to use plugins ( in this case Geolocation plugin ).
    return this.platform.ready().then(() => {
      return this.locate().then(() => {
        const mapElement: Element = this.mapService.mapElement;
        if (mapElement) {
          mapElement.classList.add('show-map');
          this.mapService.resizeMap();
        }
      });
    });
  }

  /***
   * This event is fired when the map becomes idle after panning or zooming.
   */
  onMapIdle(): void {
    if (!this.localized) return;
    const position = this.mapService.mapCenter;
    this.geocoderService.addressForlatLng(position.lat(), position.lng())
      .subscribe((address: string) => {

        const content = `<div padding><strong>${address}</strong></div>`;
        this.mapService.createInfoWindow(content, position);

      }, (error) => {
        this.displayErrorAlert();
        console.error(error);
      });
  }

  /***
   * This event is fired when the user starts dragging the map.
   */
  onDragStart(): void {
    this.mapService.closeInfoWindow();
  }

  openModal(): void {
    const searchModal = this.modalCtrl.create(SearchPage);
    searchModal.present();
  }

  goToConfirmation(): void {
    this.nav.push(ConfirmationPage);
  }

  /**
   * Get the current position
   */
  private locate(): Promise<any> {
    const loader = this.loadingCtrl.create({
      content: 'Please wait...',
    });
    loader.present();
    return this.mapService.setPosition().then(() => {
      this.localized = true;
      // Vibrate the device for a second
      Vibration.vibrate(1000);
    }).catch(error => {
      this.alertNoGps();
      console.warn(error);
    }).then(() => {
      // TODO why dismiss not working without setTimeout ?
      setTimeout(() => {
        loader.dismiss();
      }, 1000);
    });
  }

  private alertNoGps() {
    const alert = this.alertCtrl.create({
      title: 'Ionic Taxi',
      subTitle: 'Gps and network locations are unavailable. Click OK to retry',
      enableBackdropDismiss: false,
      buttons: [{
        text: 'OK',
        handler: () => {
          setTimeout(() => this.locate(), 1500);
        }
      }],
    });
    alert.present();
  }
}
