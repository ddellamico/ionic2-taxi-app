/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { beforeEach, beforeEachProviders, describe, expect, it, inject, async } from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }     from '@angular/compiler/testing';
import { NavController, App, Config, ViewController, AlertController } from 'ionic-angular';
import { SearchPage } from './search';
import { provide } from '@angular/core';
import { MapServiceMock } from '../../providers/map/map-mock.service';
import { MapService } from '../../providers/map/map.service';
import { ConfigMock, ViewControllerMock, AlertControllerMock } from '../../mock-helper';

describe('SearchPage', () => {
  beforeEachProviders(() => [
    TestComponentBuilder,
    NavController,
    provide(ViewController, {useClass: ViewControllerMock}),
    provide(AlertController, {useClass: AlertControllerMock}),
    provide(Config, {useClass: ConfigMock}),
    provide(App, {useClass: ConfigMock}),
    provide(MapService, {useClass: MapServiceMock})
  ]);

  let tcb: TestComponentBuilder, mapService: MapServiceMock;
  beforeEach(async(inject([TestComponentBuilder, MapService], (_tcb: TestComponentBuilder,
                                                               _mapService: MapServiceMock) => {
    tcb = _tcb;
    mapService = _mapService;
  })));

  it('should render `ion-content`', () => {

    return tcb.createAsync(SearchPage).then((fixture: ComponentFixture<SearchPage>) => {
      const element = fixture.nativeElement;
      const instance = fixture.componentInstance;

      expect(element).not.toBeNull();
      expect(instance).not.toBeNull();
      expect(element.querySelectorAll('ion-content').length).toBe(1);
    });
  });

  it('should setup autocomplete and load nearby places', () => {
    spyOn(mapService, 'createAutocomplete').and.callThrough();
    spyOn(mapService, 'loadNearbyPlaces').and.callThrough();

    return tcb.createAsync(SearchPage).then((fixture: ComponentFixture<SearchPage>) => {
      fixture.detectChanges();
      expect(mapService.createAutocomplete).toHaveBeenCalled();
      expect(mapService.loadNearbyPlaces).toHaveBeenCalled();
    });
  });

});
