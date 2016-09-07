/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

export class RideServiceMock {

  public fakeResponse: any = null;

  public getRides(): Array<any> {
    return [];
  }

  public addRide(): void {
  }
}
