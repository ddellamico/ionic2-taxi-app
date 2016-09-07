/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @author    @AngularClass
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

// Reference : https://github.com/webpack/karma-webpack#alternative-usage
// Reference : https://github.com/AngularClass/angular2-webpack-starter/blob/4d7a9838677401996c195ae09d95831d213c1316/config/spec-bundle.js

Error.stackTraceLimit = Infinity;

require('es6-shim/es6-shim');
require('reflect-metadata/Reflect.js');

// Typescript emit helpers polyfill
require('ts-helpers');

require('zone.js/dist/zone');

require('zone.js/dist/jasmine-patch');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');

// RxJS
require('rxjs/Rx');

var testing = require('@angular/core/testing');
var browser = require('@angular/platform-browser-dynamic/testing');

// this needs doing _once_ for the entire test suite, hence it's here
testing.setBaseTestProviders(
  browser.TEST_BROWSER_DYNAMIC_PLATFORM_PROVIDERS,
  browser.TEST_BROWSER_DYNAMIC_APPLICATION_PROVIDERS
);

var testContext = require.context('../app', true, /\.spec\.ts/);
testContext.keys().forEach(testContext);
