/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { provide } from '@angular/core';
import { beforeEach, beforeEachProviders, describe, expect, it, inject, async } from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }     from '@angular/compiler/testing';
import {
  App, NavController, Platform, AlertController, ModalController,
  LoadingController, Config
} from 'ionic-angular';
import { HomePage } from './home';
import { MapService } from '../../providers/map/map.service';
import { GeocoderService } from '../../providers/map/geocoder.service';
import { GeocoderServiceMock } from '../../providers/map/geocoder-mock.service';
import { AlertControllerMock, PlatformMock, ConfigMock, LoadingControllerMock } from '../../mock-helper';
import { MapServiceMock } from '../../providers/map/map-mock.service';

describe('HomePage', () => {
  beforeEachProviders(() => [
    TestComponentBuilder,
    NavController,
    ModalController,
    provide(Config, {useClass: ConfigMock}),
    provide(App, {useClass: ConfigMock}),
    provide(AlertController, {useClass: AlertControllerMock}),
    provide(LoadingController, {useClass: LoadingControllerMock}),
    provide(MapService, {useClass: MapServiceMock}),
    provide(GeocoderService, {useClass: GeocoderServiceMock}),
    provide(Platform, {useClass: PlatformMock})
  ]);

  let tcb: TestComponentBuilder, platform: PlatformMock, geocoderService: GeocoderServiceMock,
    mapService: MapServiceMock;

  beforeEach(async(inject([Platform, TestComponentBuilder, GeocoderService, MapService],
    (_platform: Platform,
     _tcb: TestComponentBuilder,
     _geocoderService: GeocoderServiceMock,
     _mapService: MapServiceMock) => {

      platform = _platform;
      tcb = _tcb;
      mapService = _mapService;
      geocoderService = _geocoderService;
    })));

  it('should render `ion-content`', () => {
    return tcb.createAsync(HomePage).then((fixture: ComponentFixture<HomePage>) => {
      const element = fixture.nativeElement;
      const instance = fixture.componentInstance;
      fixture.detectChanges();

      expect(element).not.toBeNull();
      expect(instance).not.toBeNull();
      expect(element.querySelectorAll('ion-content').length).toBe(1);
    });
  });

  it('should call platform ready when google map is ready', () => {

    spyOn(platform, 'ready').and.callThrough();

    return tcb.createAsync(HomePage).then((fixture: ComponentFixture<HomePage>) => {
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      instance.onMapReady({
        value: new google.maps.Map(null)
      }).then(() => {
        expect(platform.ready).toHaveBeenCalled();
      });
    });
  });

  it('should localize after google map is ready', () => {
    const _response = new Promise((resolve: Function) => {
      resolve({
        latitude: 0,
        longitude: 0
      });
    });

    spyOn(mapService, 'setPosition').and.returnValue(_response);

    return tcb.createAsync(HomePage).then((fixture: ComponentFixture<HomePage>) => {
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      instance.onMapReady({
        value: new google.maps.Map(null)
      }).then(() => {
        expect(mapService.setPosition).toHaveBeenCalled();
        expect(instance.localized).toBe(true);
      });
    });
  });

  it('should get address when google map idle event is emitted', () => {
    spyOn(geocoderService, 'addressForlatLng').and.callThrough();

    const _response = 'fake address';
    geocoderService.setResponse(_response);

    return tcb.createAsync(HomePage).then((fixture: ComponentFixture<HomePage>) => {
      const instance = fixture.componentInstance;

      instance.localized = true;
      instance.onMapIdle();
      fixture.detectChanges();

      expect(geocoderService.addressForlatLng).toHaveBeenCalled();
    });
  });

  it('should close info window when `onDragStart` is emitted', () => {
    spyOn(mapService, 'closeInfoWindow').and.callThrough();

    const _response = 'fake address';
    geocoderService.setResponse(_response);

    return tcb.createAsync(HomePage).then((fixture: ComponentFixture<HomePage>) => {
      const instance = fixture.componentInstance;
      instance.onDragStart();
      fixture.detectChanges();

      expect(mapService.closeInfoWindow).toHaveBeenCalled();
    });
  });

});
