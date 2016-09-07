/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { provide } from '@angular/core';
import { beforeEach, beforeEachProviders, describe, expect, it, inject, async } from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder } from '@angular/compiler/testing';
import { NavController, AlertController, Form } from 'ionic-angular';
import { ConfirmationPage } from './confirmation';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { RideServiceMock } from '../../providers/ride/ride-mock.service';
import { RideService } from '../../providers/ride/ride.service';
import { GeocoderService } from '../../providers/map/geocoder.service';
import { GeocoderServiceMock } from '../../providers/map/geocoder-mock.service';
import { AlertControllerMock } from '../../mock-helper';
import { MapService } from '../../providers/map/map.service';
import { MapServiceMock } from '../../providers/map/map-mock.service';

describe('ConfirmationPage', () => {
  beforeEachProviders(() => [
    disableDeprecatedForms(),
    provideForms(),
    Form,
    NavController,
    TestComponentBuilder,
    provide(MapService, {useClass: MapServiceMock}),
    provide(AlertController, {useClass: AlertControllerMock}),
    provide(RideService, {useClass: RideServiceMock}),
    provide(GeocoderService, {useClass: GeocoderServiceMock})
  ]);

  let tcb: TestComponentBuilder, geocoderService: GeocoderServiceMock, mapService: MapServiceMock;
  beforeEach(async(inject([TestComponentBuilder, MapService, GeocoderService], (_tcb: TestComponentBuilder,
                                                                    _mapService: MapServiceMock,
                                                                    _geocoderService: GeocoderServiceMock) => {
    tcb = _tcb;
    mapService = _mapService;
    geocoderService = _geocoderService;
  })));

  it('should render `ion-content`', () => {
    return tcb.createAsync(ConfirmationPage).then((fixture: ComponentFixture<ConfirmationPage>) => {
      const element = fixture.nativeElement;
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      expect(element).not.toBeNull();
      expect(instance).not.toBeNull();

      expect(element.querySelectorAll('ion-content').length).toBe(1);
    });
  });

  it('should get address when google map idle event is emitted', () => {
    spyOn(geocoderService, 'addressForlatLng').and.callThrough();

    const _response = 'fake address';
    geocoderService.setResponse(_response);

    return tcb.createAsync(ConfirmationPage).then((fixture: ComponentFixture<ConfirmationPage>) => {
      const instance = fixture.componentInstance;

      fixture.detectChanges();

      expect(geocoderService.addressForlatLng).toHaveBeenCalled();
      expect(instance.departure).toBe(_response);
    });
  });

});
