/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { IonicModule, Platform } from 'ionic-angular';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaxiApp } from '../../app/app.component';
import { HomePage } from './home';
import { GeocoderServiceMock } from '../../providers/map/geocoder-mock.service';
import { GeocoderService } from '../../providers/map/geocoder.service';
import { MapService } from '../../providers/map/map.service';
import { MapServiceMock } from '../../providers/map/map-mock.service';
import { NavMock } from '../../ionic-mock';

describe('Page: HomePage', () => {

  let comp: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let de: DebugElement;
  let el: HTMLElement;
  let mapService: MapService;
  let geocoderService: GeocoderServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TaxiApp, HomePage],
      providers: [
        {provide: NavController, useClass: NavMock},
        {provide: GeocoderService, useClass: GeocoderServiceMock},
        {provide: MapService, useClass: MapServiceMock}
      ],
      imports: [
        IonicModule.forRoot(TaxiApp)
      ]
    }).compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(HomePage);
    comp = fixture.componentInstance;
    de = fixture.debugElement;

    mapService = TestBed.get(MapService);
    geocoderService = TestBed.get(GeocoderService);

    // #trick
    // If you want to trigger ionViewWillEnter automatically de-comment the following line
    // fixture.componentInstance.ionViewWillEnter();
  });

  afterEach(() => {
    fixture.destroy();
    comp = null;
    de = null;
    el = null;
  });

  it('is created', () => {
    expect(fixture).toBeTruthy();
    expect(comp).toBeTruthy();
  });

  it('should render `ion-content`', () => {
    fixture.detectChanges();
    expect(de.nativeElement.querySelectorAll('ion-content').length).toBe(1);
  });

  it('should call platform ready when google map is ready', () => {
    const platform = de.injector.get(Platform);
    spyOn(platform, 'ready').and.callThrough();

    const instance = fixture.componentInstance;
    instance.onMapReady().then(() => {
      expect(platform.ready).toHaveBeenCalled();
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

    const instance = fixture.componentInstance;
    fixture.detectChanges();
    instance.onMapReady().then(() => {
      expect(mapService.setPosition).toHaveBeenCalled();
      expect(instance.localized).toBe(true);
    });
  });

  it('should get address when google map idle event is emitted', () => {
    spyOn(geocoderService, 'addressForlatLng').and.callThrough();

    const _response = 'fake address';
    geocoderService.setResponse(_response);

    const instance = fixture.componentInstance;

    instance.localized = true;
    instance.onMapIdle();
    fixture.detectChanges();

    expect(geocoderService.addressForlatLng).toHaveBeenCalled();
  });

  it('should close info window when `onDragStart` is emitted', () => {
    spyOn(mapService, 'closeInfoWindow').and.callThrough();

    const _response = 'fake address';
    geocoderService.setResponse(_response);

    const instance = fixture.componentInstance;
    instance.onDragStart();
    fixture.detectChanges();

    expect(mapService.closeInfoWindow).toHaveBeenCalled();
  });
});
