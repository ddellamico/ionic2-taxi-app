/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

// Reference http://lathonez.github.io/2016/ionic-2-unit-testing/

import { provide } from '@angular/core';
import { beforeEachProviders, inject } from '@angular/core/testing';
import { Events, Platform } from 'ionic-angular';
import { TaxiApp } from './app';
import { StatusBar, Splashscreen } from 'ionic-native';

// Mock out Ionic's platform class
class PlatformMock {
  public ready(): any {
    return new Promise((resolve: Function) => {
      resolve();
    });
  }
}

let taxiApp: TaxiApp;

describe('TaxiApp', () => {

  // provide our implementations or mocks to the dependency injector
  beforeEachProviders(() => [
    Events,
    provide(Platform, {useClass: PlatformMock}),
  ]);

  let platform;
  beforeEach(inject([Platform], (_platform: Platform) => {
    platform = _platform;
    spyOn(_platform, 'ready').and.callThrough();

    spyOn(StatusBar, 'styleDefault');
    spyOn(Splashscreen, 'hide');

    taxiApp = new TaxiApp(_platform);
  }));

  it('should initialize with an app', () => {
    expect(taxiApp['app']).not.toBe(null);
  });

  it('should have a root page', () => {
    expect(taxiApp['rootPage']).not.toBe(null);
  });

  it('should call platform ready', () => {
    expect(platform.ready).toHaveBeenCalled();
  });

  it('should have 2 main pages', () => {
    expect(taxiApp.appPages.length).toEqual(3);
  });

  // TODO Why spy not working with plugins ?
  // https://forum.ionicframework.com/t/unit-testing-ionic-native-statusbar/55670

  /*  it('should call StatusBar plugin', () => {
   expect(StatusBar.styleDefault).toHaveBeenCalled();
   });

   it('should call Splashscreen plugin', () => {
   expect(Splashscreen.hide).toHaveBeenCalled();
   });*/

});
