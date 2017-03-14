/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GeocoderService } from '../../providers/map/geocoder.service';
import { RideModel } from '../../providers/ride/ride.model';
import { RideService } from '../../providers/ride/ride.service';
import { BasePage } from '../base-page';
import { RideListPage } from '../ride-list/ride-list';
import { MapService } from '../../providers/map/map.service';

@Component({
  templateUrl: 'confirmation.tpl.html'
})
export class ConfirmationPage extends BasePage {
  form: FormGroup;
  position: google.maps.LatLng;

  departure: string = null;
  destination: string = null;

  constructor(private nav: NavController,
              private fb: FormBuilder,
              private rideService: RideService,
              private mapService: MapService,
              private geocoderService: GeocoderService,
              protected alertCtrl: AlertController) {
    super(alertCtrl);

    this.form = this.fb.group({
      departure: ['', [Validators.required]],
      destination: ['', [Validators.required]]
    });

    this.position = this.mapService.mapCenter;

    if (this.position) {
      this.geocoderService.addressForlatLng(this.position.lat(), this.position.lng())
        .subscribe((address: string) => {
          this.departure = address;
        }, (error) => {
          this.displayErrorAlert();
          console.error(error);
        });
    }
  }

  onConfirm(model: RideModel, isValid: boolean): void {
    if (!isValid) {
      this.displayErrorAlert();
      return;
    }
    const prompt = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Taxi will pick you up within 5 minutes. Do you want to confirm ?',
      buttons: [{
        text: 'Cancel'
      }, {
        text: 'Confirm',
        handler: () => {
          this.rideService.addRide(model.departure, model.destination);
          this.nav.setRoot(RideListPage);
        }
      }]
    });
    prompt.present();
  }
}
