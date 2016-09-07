/**
 * @author    Damien Dell'Amico <damien.dellamico@gmail.com>
 * @copyright Copyright (c) 2016
 * @license   GPL-3.0
 */

const path = require('path');
const webpack = require('webpack');
const helpers = require('./webpack.helper');
const pkg = require('./package.json');

/*
 * Webpack Plugins
 */
const validate = require('webpack-validator');
const Joi = require('webpack-validator').Joi;
const merge = require('webpack-merge');

/*
 * Webpack Constants
 */
const paths = {
  www: path.join(__dirname, 'www'),
  src: path.join(__dirname, 'app')
};

console.log('process.env.NODE_ENV ====> ', process.env.NODE_ENV);

const platform = process.env.PLATFORM || 'android';
console.log('platform ====> ', platform);

const themes = {
  ios: 'app.ios.scss',
  android: 'app.md.scss',
  wp: 'app.wp.scss'
};

paths.style = path.join(__dirname, 'app', 'theme', themes[platform]);
console.log('theme path ====> ', paths.style);

const vendorsPath = path.join(paths.src, 'index.vendors.ts');

const common = {
  entry: {
    app: path.join(paths.src, 'app.ts'),
    style: paths.style
  },
  output: {
    /**
     * The output directory as absolute path (required).
     *
     * See: http://webpack.github.io/docs/configuration.html#output-path
     */
    path: paths.www,
    /**
     * Specifies the name of each output file on disk.
     * IMPORTANT: You must not specify an absolute path here!
     *
     * See: http://webpack.github.io/docs/configuration.html#output-filename
     */
    filename: '[name].js'
  },

  /*
   * Options affecting the resolving of modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#resolve
   */
  resolve: {
    /*
     * An array of extensions that should be used to resolve modules.
     *
     * See: http://webpack.github.io/docs/configuration.html#resolve-extensions
     */
    extensions: ['', '.ts', '.js', '.html', '.scss', '.png'],
    // Make sure root is src
    root: [
      paths.src,
      path.join(__dirname, 'node_modules')
    ],
    // remove other default values
    modulesDirectories: [
      'node_modules'
    ]
  },
  sassLoader: {
    includePaths: [
      path.resolve(__dirname, './node_modules/ionic-angular/'),
      path.resolve(__dirname, './node_modules/ionicons/dist/scss/')
    ]
  },

  /*
   * Add additional plugins to the compiler.
   *
   * See: http://webpack.github.io/docs/configuration.html#plugins
   */
  plugins: [
    /**
     * Plugin: DefinePlugin
     * Description: Define free variables.
     * Useful for having development builds with debug logging or adding global constants.
     *
     * Environment helpers
     *
     * See: https://webpack.github.io/docs/list-of-plugins.html#defineplugin
     */
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production',
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV),
        'API_URL': JSON.stringify(process.env.API_URL),
        'CLIENT_ID': JSON.stringify(process.env.CLIENT_ID),
        'CLIENT_SECRET': JSON.stringify(process.env.CLIENT_SECRET),
      }
    })
  ],

  /*
   * Options affecting the normal modules.
   *
   * See: http://webpack.github.io/docs/configuration.html#module
   */
  module: {

    /*
     * An array of automatically applied loaders.
     *
     * IMPORTANT: The loaders here are resolved relative to the resource which they are applied to.
     * This means they are not resolved relative to the configuration file.
     *
     * See: http://webpack.github.io/docs/configuration.html#module-loaders
     */
    loaders: [
      /*
       * Json loader support for *.json files.
       *
       * See: https://github.com/webpack/json-loader
       */
      {
        test: /\.json$/,
        loader: 'json'
      }, {
        test: /\.(png|jpg|svg)$/,
        loader: 'file?name=img/[ext]/[name].[ext]'
      }, {
        test: /\.html$/,
        // uglifyjsplugin breaking angular 2 templates: http://stackoverflow.com/questions/38983225/uglifyjsplugin-breaking-angular-2-templates
        loader: 'html?-minimize'
      }, {
        test: [/ionicons\.svg/, /ionicons\.eot/, /ionicons\.ttf/, /ionicons\.woff/, /roboto-bold\.woff/, /roboto-medium\.woff/, /roboto-light\.woff/, /roboto-regular\.woff/, /roboto-bold\.ttf/, /roboto-medium\.ttf/, /roboto-light\.ttf/, /roboto-regular\.ttf/, /noto-sans-bold\.ttf/, /noto-sans-regular\.ttf/],
        loader: 'file?name=fonts/[name].[ext]'
      }
    ],
    noParse: [/.+zone\.js\/dist\/.+/, /.+angular2\/bundles\/.+/, /angular2-polyfills\.js/]
  }
};

let config;
switch (process.env.NODE_ENV) {
  case 'prod':
  case 'production':
    config = merge(common, {
        output: {
          path: paths.www,

          /**
           * Specifies the name of each output file on disk.
           * IMPORTANT: You must not specify an absolute path here!
           *
           * See: http://webpack.github.io/docs/configuration.html#output-filename
           */
          filename: '[name].[chunkhash].js',

          /** The filename of non-entry chunks as relative path
           * inside the output.path directory.
           *
           * See: http://webpack.github.io/docs/configuration.html#output-chunkfilename
           */
          chunkFilename: '[chunkhash].js'
        },
        plugins: [
          // Reference: http://webpack.github.io/docs/list-of-plugins.html#noerrorsplugin
          // Only emit files when there are no errors
          new webpack.NoErrorsPlugin(),
          // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
          // Dedupe modules in the output
          new webpack.optimize.DedupePlugin()
        ]
      },
      helpers.clean(paths.www),
      helpers.setupTypescript(paths.src),
      helpers.extractBundle({ name: 'vendors', entries: vendorsPath }),
      helpers.indexTemplate({
        template: path.join(paths.src, 'index.html')
      }),
      helpers.minify(),
      helpers.extractSass(paths.style)
    );
    break;
  case 'test':
  case 'testing':
    config = merge(common, {
        entry: {}, // The entry point from the common Webpack configuration has to be removed or tests will fail
        /**
         * Source map for Karma from the help of karma-sourcemap-loader &  karma-webpack
         * See: https://github.com/webpack/karma-webpack#source-maps
         */
        devtool: 'inline-source-map',
      },
      helpers.setupTypescript(paths.src),
      helpers.setupSourceMaps()
    );
    break;
  default:
    config = merge(common, {
        devtool: 'eval-source-map',
      },
      helpers.setupTypescript(paths.src),
      helpers.setupSass(paths.style),
      helpers.extractBundle({ name: 'vendors', entries: vendorsPath }),
      helpers.indexTemplate({
        template: path.join(paths.src, 'index.html')
      })
    );
    if (helpers.isWebpackDevServer()) {
      config = merge(config, helpers.devServer({
        // Customize host/port here if needed
        host: process.env.HOST,
        port: process.env.PORT
      }));
    }
}
// Detect how npm is run and branch based on that

// This joi schema will be `Joi.concat`-ed with the internal schema
// https://github.com/js-dxtools/webpack-validator
const webpackValidatorExtension = Joi.object({
  // this would just allow the property and doesn't perform any additional validation
  sassLoader: Joi.any()
});

module.exports = validate(config, {
  schemaExtension: webpackValidatorExtension,
  quiet: true
});
