/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import { Platform } from 'ionic-angular';
import { TaxiApp } from './app.component';
import { TestBed, ComponentFixture, async } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, DebugElement } from '@angular/core';
import { PlatformMock } from '../ionic-mock';
import {  } from 'jasmine';

describe('TaxiApp', () => {

  let comp: TaxiApp;
  let fixture: ComponentFixture<TaxiApp>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      declarations: [TaxiApp],
      providers: [
        {provide: Platform, useClass: PlatformMock}
      ]
    }).compileComponents();
  }));

  beforeEach(() => {

    fixture = TestBed.createComponent(TaxiApp);
    comp = fixture.componentInstance;
    de = fixture.debugElement;

    // #trick
    // If you want to trigger ionViewWillEnter automatically de-comment the following line
    // fixture.componentInstance.ionViewWillEnter();

    fixture.detectChanges();
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

  it('should initialize with an app', () => {
    expect(comp['app']).not.toBe(null);
  });

  it('should have a root page', () => {
    expect(comp['rootPage']).not.toBe(null);
  });

  it('should have 2 main pages', () => {
    expect(comp.appPages.length).toEqual(3);
  });

});
