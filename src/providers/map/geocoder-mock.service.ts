/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Observable } from 'rxjs/Observable';

export class GeocoderServiceMock {

  public fakeResponse: any = null;

  public addressForlatLng(): Observable<any> {
    return Observable.of(this.fakeResponse);
  }

  public setResponse(data: any): void {
    this.fakeResponse = data;
  }
}
