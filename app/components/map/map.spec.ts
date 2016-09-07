/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { provide } from '@angular/core';
import { beforeEach, beforeEachProviders, describe, expect, it, inject, async } from '@angular/core/testing';
import { ComponentFixture, TestComponentBuilder }     from '@angular/compiler/testing';
import { MapComponent } from './map';
import { MapServiceMock } from '../../providers/map/map-mock.service';
import { MapService } from '../../providers/map/map.service';

describe('MapComponent', () => {
  beforeEachProviders(() => [
    TestComponentBuilder,
    provide(MapService, {useClass: MapServiceMock})
  ]);

  let tcb: TestComponentBuilder, mapService: MapServiceMock;
  beforeEach(async(inject([TestComponentBuilder, MapService], (_tcb: TestComponentBuilder,
                                                               _mapService: MapServiceMock) => {
    tcb = _tcb;
    mapService = _mapService;
  })));

  it('should render div map container', () => {
    return tcb.createAsync(MapComponent).then((fixture: ComponentFixture<MapComponent>) => {
      const element = fixture.nativeElement;
      const instance = fixture.componentInstance;
      fixture.detectChanges();

      expect(element).not.toBeNull();
      expect(instance).not.toBeNull();
      expect(element.querySelectorAll('div#gmaps').length).toBe(1);
    });
  });

  it('should create a new map', () => {

    const _response = new Promise((resolve: Function) => {
      resolve(true);
    });

    spyOn(mapService, 'createMap').and.returnValue(_response);

    return tcb.createAsync(MapComponent).then((fixture: ComponentFixture<MapComponent>) => {
      const instance = fixture.componentInstance;
      instance.ngAfterViewInit().then(() => {
        expect(mapService.createMap).toHaveBeenCalled();
        expect(instance.map).toBeTruthy();
      });

    });
  });

});
