/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { IonicModule, Platform, ViewController, AlertController } from 'ionic-angular';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TaxiApp } from '../../app/app.component';
import { SearchPage } from './search';
import { GeocoderServiceMock } from '../../providers/map/geocoder-mock.service';
import { GeocoderService } from '../../providers/map/geocoder.service';
import { MapService } from '../../providers/map/map.service';
import { MapServiceMock } from '../../providers/map/map-mock.service';
import { NavMock, ViewControllerMock, AlertControllerMock } from '../../ionic-mock';
import { RideService } from '../../providers/ride/ride.service';
import { RideServiceMock } from '../../providers/ride/ride-mock.service';

describe('Page: SearchPage', () => {

  let comp: SearchPage;
  let fixture: ComponentFixture<SearchPage>;
  let de: DebugElement;
  let el: HTMLElement;
  let mapService: MapService;
  let rideService: RideService;
  let geocoderService: GeocoderServiceMock;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TaxiApp, SearchPage],
      providers: [
        {provide: NavController, useClass: NavMock},
        {provide: ViewController, useClass: ViewControllerMock},
        {provide: AlertController, useClass: AlertControllerMock},
        {provide: RideService, useClass: RideServiceMock},
        {provide: MapService, useClass: MapServiceMock},
        {provide: GeocoderService, useClass: GeocoderServiceMock}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPage);
    comp = fixture.componentInstance;
    de = fixture.debugElement;

    mapService = TestBed.get(MapService);
    rideService = TestBed.get(RideService);
    geocoderService = TestBed.get(GeocoderService);
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

  it('should setup autocomplete and load nearby places', () => {
    spyOn(mapService, 'createAutocomplete').and.callThrough();
    spyOn(mapService, 'loadNearbyPlaces').and.callThrough();

    fixture.componentInstance.ionViewDidLoad();

    fixture.detectChanges();
    expect(mapService.createAutocomplete).toHaveBeenCalled();
    expect(mapService.loadNearbyPlaces).toHaveBeenCalled();
  });
});
