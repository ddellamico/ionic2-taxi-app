/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { AlertController } from 'ionic-angular';

export class BasePage {

  constructor(protected alertCtrl: AlertController) {
  }

  displayErrorAlert(): void {
    const prompt = this.alertCtrl.create({
      title: 'Ionic Taxi',
      message: 'Unknown error, please try again later',
      buttons: ['OK']
    });
    prompt.present();
  }
}
