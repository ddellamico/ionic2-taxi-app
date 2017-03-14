/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Observable } from 'rxjs/Observable';
import { MapConst } from './map.constants';

interface IMapOptions {
  lat: number;
  lon: number;
  zoom: number;
}

export class MapServiceMock {

  constructor() {
  }

  public createMap(mapEl: Element, opts: IMapOptions = {
    lat: MapConst.DEFAULT_LAT,
    lon: MapConst.DEFAULT_LNG,
    zoom: MapConst.DEFAULT_ZOOM
  }): Promise<google.maps.Map> {
    return Promise.resolve(new google.maps.Map(mapEl));
  }

  public get mapCenter(): google.maps.LatLng {
    return new google.maps.LatLng(MapConst.DEFAULT_LAT, MapConst.DEFAULT_LNG);
  }

  public set mapCenter(location: google.maps.LatLng) {
  }

  public get mapElement(): Element {
    return new Element();
  }

  public createInfoWindow(content: string, position: google.maps.LatLng): void {
  }

  public closeInfoWindow(): void {
  }

  public createAutocomplete(addressEl: HTMLInputElement): Observable<any> {
    return Observable.of(new google.maps.LatLng(MapConst.DEFAULT_LAT, MapConst.DEFAULT_LNG));
  }

  public setPosition(): Promise<any> {
    return Promise.resolve();
  }

  public resizeMap(): void {
  }

  public loadMap(): Promise<any> {
    return Promise.resolve();
  }

  public loadNearbyPlaces(): Observable<any> {
    return Observable.of([]);
  }
}
