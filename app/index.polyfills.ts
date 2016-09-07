/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @author    @AngularClass
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

import 'es6-shim/es6-shim';
import 'reflect-metadata/Reflect.js';
import 'zone.js/dist/zone';

// Typescript emit helpers polyfill
import 'ts-helpers';

if (process.env.NODE_ENV !== 'production') {
  // Tun on full stack traces in errors to help debugging
  Error.stackTraceLimit = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}
