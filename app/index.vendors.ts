/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @author    @AngularClass
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

// polyfills
import './index.polyfills';

// Angular 2
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// Ionic
import 'ionic-angular';
import 'ionic-native';

// Others
import 'lodash';

// RxJS
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/retry';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/from';
