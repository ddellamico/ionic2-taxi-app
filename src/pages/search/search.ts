/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ViewController, AlertController } from 'ionic-angular';
import { MapService } from '../../providers/map/map.service';
import { BasePage } from '../base-page';

@Component({
  templateUrl: 'search.tpl.html'
})

export class SearchPage extends BasePage {

  // reference : https://github.com/driftyco/ionic/issues/7223
  @ViewChild('searchbar', {read: ElementRef}) searchbar: ElementRef;

  private nearbyPlaces: Array<any> = [];
  private addressElement: HTMLInputElement = null;

  constructor(private mapService: MapService,
              private zone: NgZone,
              protected alertCtrl: AlertController,
              private viewCtrl: ViewController) {
    super(alertCtrl);
  }

  ionViewDidLoad() {
    this.initAutocomplete();
    this.loadNearbyPlaces();
  }

  dismiss(location?: google.maps.LatLng) {
    if (location) {
      this.mapService.mapCenter = location;
    }
    if (this.addressElement) {
      this.addressElement.value = '';
    }
    this.viewCtrl.dismiss();
  }

  /***
   * Place item has been selected
   */
  selectPlace(place: any) {
    this.dismiss(place.geometry.location);
  }

  private initAutocomplete(): void {
    // reference : https://github.com/driftyco/ionic/issues/7223
    this.addressElement = this.searchbar.nativeElement.querySelector('.searchbar-input');
    this.mapService.createAutocomplete(this.addressElement).subscribe((location) => {
      this.dismiss(location);
    }, (error) => {
      this.displayErrorAlert();
      console.error(error);
    });
  }

  private loadNearbyPlaces(): void {
    this.nearbyPlaces = [];
    this.mapService.loadNearbyPlaces().subscribe((_nearbyPlaces) => {
      // force NgZone to detect changes
      this.zone.run(() => {
        this.nearbyPlaces.push.apply(this.nearbyPlaces, _nearbyPlaces);
      });
    }, (error) => {
      this.displayErrorAlert();
      console.error(error);
    });
  }
}
