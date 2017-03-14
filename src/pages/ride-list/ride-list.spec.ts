/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { beforeEach, beforeEachProviders, describe, expect, it, inject, async } from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }     from '@angular/compiler/testing';
import { NavController, AlertController, Config, App } from 'ionic-angular';
import { RideListPage } from './ride-list';
import { provide } from '@angular/core';
import { RideServiceMock } from '../../providers/ride/ride-mock.service';
import { RideService } from '../../providers/ride/ride.service';
import { AlertControllerMock, ConfigMock } from '../../mock-helper';

describe('RideListPage', () => {
  beforeEachProviders(() => [
    TestComponentBuilder,
    NavController,
    provide(Config, {useClass: ConfigMock}),
    provide(App, {useClass: ConfigMock}),
    provide(AlertController, {useClass: AlertControllerMock}),
    provide(RideService, {useClass: RideServiceMock}),
  ]);

  let tcb: TestComponentBuilder, rideService: RideServiceMock;
  beforeEach(async(inject([TestComponentBuilder, RideService], (_tcb: TestComponentBuilder,
                                                                _rideService: RideServiceMock) => {
    rideService = _rideService;
    tcb = _tcb;
  })));

  it('should render `ion-content`', () => {
    return tcb.createAsync(RideListPage).then((fixture: ComponentFixture<RideListPage>) => {
      const element = fixture.nativeElement;
      const instance = fixture.componentInstance;
      fixture.detectChanges();

      expect(element).not.toBeNull();
      expect(instance).not.toBeNull();
      expect(element.querySelectorAll('ion-content').length).toBe(1);
    });
  });

  it('should fetch all taxi rides at page load', () => {

    spyOn(rideService, 'getRides').and.returnValue(Promise.resolve([]));

    return tcb.createAsync(RideListPage).then((fixture: ComponentFixture<RideListPage>) => {
      const instance = fixture.componentInstance;
      instance.ionViewDidEnter();

      expect(rideService.getRides).toHaveBeenCalled();
      expect(instance.rides).not.toBeUndefined();
    });
  });

});
