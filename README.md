# Ionic 2 Taxi App

[![Build Status](https://travis-ci.org/ddellamico/ionic2-taxi-app.svg?branch=master)](https://travis-ci.org/ddellamico/ionic2-taxi-app) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg?style=flat-square)](http://commitizen.github.io/cz-cli/) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT) [![Dependency Status](https://david-dm.org/ddellamico/ionic2-taxi-app.svg)](https://david-dm.org/ddellamico/ionic2-taxi-app) [![devDependency Status](https://david-dm.org/ddellamico/ionic2-taxi-app/dev-status.svg)](https://david-dm.org/ddellamico/ionic2-taxi-app#info=devDependencies)

The main purpose for this project, it's provide a simple starting point for building 'on-demand/rideshare taxi' ionic application ( something like Uber, Lyft or Sidecar .. ) or more generally, applications using extensively Google Maps JavaScript API. 

When you start the app, you see a map centering around your location, with a marker permanently fixed to the center of map. 
When the user stop moving the map, an InfoWindow shows the new position. To achieve this, I use google maps geocoder service along with rxjs, that let you easily handle 'OVER_QUERY_LIMIT' response ( API Usage Limits ).

** Build configuration and test setup is heavily inspired from this great Ionic 2 boilerplate, take a look [here](https://github.com/marcoturi/ionic2-boilerplate). ** 

If you are looking for a more complex and complete Ionic 2 app sample, [check out here](https://github.com/ddellamico/ionic-conference-app).

**Note: This project is under development.**

## App Preview

<p align="center">
  <img src="http://37.139.10.18/images/1_Home.png" alt="Home" width="250">
  <img src="http://37.139.10.18/images/2_Search.png" alt="Search" width="250">
  <img src="http://37.139.10.18/images/3_AutoComplete.png" alt="AutoComplete" width="250">
  <img src="http://37.139.10.18/images/4_Confirmation.png" alt="Confirmation" width="250">
  <img src="http://37.139.10.18/images/5_Rides.png" alt="Rides" width="250">
  <img src="http://37.139.10.18/images/6_Menu.png" alt="Menu" width="250">
</p>
  
## Features
  * Ionic 2 Final: <https://github.com/driftyco/ionic>
  * [TypeScript](http://www.typescriptlang.org/)
  * [RxJS](https://github.com/Reactive-Extensions/RxJS)
  * [Webpack](http://webpack.github.io/)
  * [Yarn](https://github.com/yarnpkg/yarn) for fast, reliable, and secure dependency management.
  * [BetterScripts](https://github.com/benoror/better-npm-run) for better NPM scripts.
  * [tslint](https://github.com/palantir/tslint)
  * [Codelyzer](https://github.com/mgechev/codelyzer)
  * [Typedoc](https://github.com/TypeStrong/typedoc)
  * [NVM](https://github.com/creationix/nvm) to manage multiple active node.js versions

## Install
  **Make sure you have Node version >= 6.X and NPM >= 3** (node.js version used 7.5.0 and NPM v. 4.1.2)
  
  ```bash
  # Clone the repo
  $ git clone https://github.com/ddellamico/ionic2-taxi-app
  -----
  # change directory to our repo
  cd ionic2-taxi-app
  -----
  # install the repo with yarn
  yarn
  -----
  # restore plugins and platforms
  cordova prepare
  -----
  # start the server (webpack-dev-server)
  npm run dev
  ```
  
  go to [http://0.0.0.0:8100](http://0.0.0.0:8100) or [http://localhost:8100](http://localhost:8100) in your browser
  
## Commands
  ```bash
  $ npm run dev             --> Run ionic serve ( development )
  $ npm run build           --> build files inside www folder ( production )
  $ npm run test            --> run test with Karma
  $ npm run ios:dev         --> start ios simulator (ionic run ios)
  $ npm run ios:release     --> build files for ios platform and generate xcodeproj (ionic build ios)
  $ npm run android:dev     --> start android simulator (ionic run android)
  $ npm run android:release --> build files for android platform and generate apk (ionic build android)
  ```
  
## Commit:
  
  Follows [AngularJS's commit message convention](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelines)
  ```sh
  # Lint and execute tests before committing code.
  npm run commit
  # OR
  # use git commit directly with correct message convention.
  git commit -m "chore(ghooks): Add pre-commit and commit-msg ghook"
  ```

## Tests

```sh
$ npm test
```
 
## Changelog

You can check the changelog [here](https://github.com/ddellamico/ionic2-taxi-app/blob/master/CHANGELOG.md)

## Todo

* Add more test with karma 
* Add protractor (E2E testing)
* Add HMR

## License

MIT
