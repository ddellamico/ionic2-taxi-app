/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { RideService } from '../../providers/ride/ride.service';
import { BasePage } from '../base-page';
import { RideModel } from '../../providers/ride/ride.model';

@Component({
  templateUrl: 'ride-list.tpl.html'
})
export class RideListPage extends BasePage {
  rides: Array<RideModel> = [];

  constructor(private rideService: RideService,
              protected alertCtrl: AlertController) {
    super(alertCtrl);
  }

  ionViewDidEnter() {
    this.rides = this.rideService.getRides();
  }
}
