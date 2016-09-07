/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import * as uuid from 'node-uuid';
import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { RideModel } from './ride.model';

@Injectable()
export class RideService {
  _rides: Array<RideModel> = [];

  constructor(public events: Events) {
  }

  addRide(departure: string, destination: string): void {
    const model = new RideModel(uuid.v4(), departure, destination);
    this._rides.push(model);
  }

  getRides(): Array<RideModel> {
    return this._rides;
  }
}
