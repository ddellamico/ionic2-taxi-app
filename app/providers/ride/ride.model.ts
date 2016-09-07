/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

export class RideModel {
  constructor(public _id: string,
              public departure: string,
              public destination: string,
              public rideDate: Date = new Date()) {
  }
}
