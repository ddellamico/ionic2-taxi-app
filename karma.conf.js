/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

// Reference: http://karma-runner.github.io/0.13/config/configuration-file.html

var webpackConfig = require('./webpack.config.js');

module.exports = function karmaConfig(config) {
  var configuration = {

    // base path that will be used to resolve all patterns (e.g. files, exclude)
    basePath: '.',

    // Karma’s "context" html file with an <ion-app></ion-app> injected
    customContextFile: './test/karma-static/context.html',
    // Karma’s "debug" html file with an <ion-app></ion-app> injected
    customDebugFile: './test/karma-static/debug.html',

    frameworks: [
      // Set framework to jasmine
      'jasmine'
    ],

    reporters: [
      // Reference: https://github.com/mlex/karma-spec-reporter
      // Set reporter to print detailed results to console
      'spec',

      // Reference: https://github.com/karma-runner/karma-coverage
      // Output code coverage files
      'coverage'
    ],

    /*
     * list of files / patterns to load in the browser
     *
     */
    files: [
      './test/libs/google-maps-api-mock.js',
      { pattern: './test/index.js', watched: false }
    ],


    // list of files to exclude
    exclude: [
      'node_modules/angular2/**/*_spec.js',
      'node_modules/ionic-angular/**/*spec*'
    ],

    preprocessors: { './test/index.js': ['coverage', 'webpack', 'sourcemap'] },

    browsers: [
      'Chrome'
    ],

    browserNoActivityTimeout: 30000,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // Configure code coverage reporter
    coverageReporter: {
      dir: 'coverage/',
      type: 'html'
    },

    // Test webpack config
    webpack: webpackConfig,

    // Hide webpack build information from output
    webpackMiddleware: {
      noInfo: true
    },

    customLaunchers: {
      ChromeTravisCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },

    /*
     * Continuous Integration mode
     * if true, Karma captures browsers, runs the tests and exits
     */
    singleRun: true
  };

  if (process.env.TRAVIS) {
    configuration.browsers = ['ChromeTravisCi'];
  }

  config.set(configuration);
};

