const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

exports.isWebpackDevServer = function () {
  return process.argv[1] && !!(/webpack-dev-server$/.exec(process.argv[1]));
};

/*
 * Plugin: HtmlWebpackPlugin
 * Description: Simplifies creation of HTML files to serve your webpack bundles.
 * This is especially useful for webpack bundles that include a hash in the filename
 * which changes every compilation.
 *
 * See: https://github.com/ampedandwired/html-webpack-plugin
 */
exports.indexTemplate = function (options) {
  return {
    plugins: [
      new HtmlWebpackPlugin({
        template: options.template,
        inject: options.inject || 'body'
      })
    ]
  };
};

exports.devServer = function (options) {
  return {
    devServer: {
      // Enable history API fallback so HTML5 History API based
      // routing works. This is a good default that will come
      // in handy in more complicated setups.
      historyApiFallback: true,

      // Unlike the cli flag, this doesn't set
      // HotModuleReplacementPlugin!
      hot: true,
      inline: true,

      // Display only errors to reduce the amount of output.
      stats: 'errors-only',

      // Parse host and port from env to allow customization.
      //
      // If you use Vagrant or Cloud9, set
      // host: options.host || '0.0.0.0';
      //
      // 0.0.0.0 is available to all network devices
      // unlike default `localhost`.
      host: options.host, // Defaults to `localhost`
      port: options.port // Defaults to 8080
    },
    plugins: [
      // Enable multi-pass compilation for enhanced performance
      // in larger projects. Good default.
      new webpack.HotModuleReplacementPlugin({
        multiStep: true
      })
    ]
  };
};

exports.clean = function (path) {
  return {
    plugins: [
      new CleanWebpackPlugin([path], {
        root: process.cwd(),
        exclude: ['.gitkeep']
      })
    ]
  };
};

exports.minify = function () {
  return {
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        comments: false,
        compress: {
          warnings: false,
          drop_console: true
        },
        // Mangling specific options
        mangle: false
      })
    ]
  };
};

/*
 * Plugin: CommonsChunkPlugin
 * Description: Shares common code between the pages.
 * It identifies common modules and put them into a commons chunk.
 *
 * See: https://webpack.github.io/docs/list-of-plugins.html#commonschunkplugin
 * See: https://github.com/webpack/docs/wiki/optimization#multi-page-app
 */
exports.extractBundle = function (options) {
  const entry = {};
  entry[options.name] = options.entries;

  return {
    // Define an entry point needed for splitting.
    entry: entry,
    plugins: [
      // Extract bundle and manifest files. Manifest is
      // needed for reliable caching.
      new webpack.optimize.CommonsChunkPlugin({
        names: [options.name, 'manifest']
      })
    ]
  };
};

exports.extractSass = function (paths) {
  return {
    module: {
      loaders: [
        // Extract CSS during build
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('style', 'css!sass'),
          include: paths
        }
      ]
    },
    plugins: [
      // Output extracted CSS to a file
      new ExtractTextPlugin('[name].[chunkhash].css')
    ]
  };
};

/*
 * Typescript loader support for .ts
 *
 * See: https://github.com/s-panferov/awesome-typescript-loader
 */
exports.setupTypescript = function (paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.ts$/,
          loader: 'awesome-typescript',
          include: paths,
          exclude: /(node_modules)/
        }
      ]
    },
    plugins: [
      /*
       * Plugin: ForkCheckerPlugin
       * Description: Do type checking in a separate process, so webpack don't need to wait.
       *
       * See: https://github.com/s-panferov/awesome-typescript-loader#forkchecker-boolean-defaultfalse
       */
      new ForkCheckerPlugin(),
    ]
  };
};

exports.setupSass = function (paths) {
  return {
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass'],
          include: paths
        }
      ]
    }
  };
};

/**
 * Source map loader support for *.js files
 * Extracts SourceMaps for source files that as added as sourceMappingURL comment.
 *
 * See: https://github.com/webpack/source-map-loader
 */
exports.setupSourceMaps = function () {
  return {
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loader: 'source-map-loader',
          exclude: /(node_modules)/
        }
      ]
    }
  };
};

exports.setFreeVariable = function (key, value) {
  const env = {};
  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
};
