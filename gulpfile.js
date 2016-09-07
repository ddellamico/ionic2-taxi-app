var gulp = require('gulp'),
  del = require('del'),
  gutil = require('gulp-util'),
  shell = require('gulp-shell'),
  argv = process.argv;

/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);
gulp.task('emulate:before', ['watch']);
gulp.task('deploy:before', ['build']);

// TODO Fix bug with ionic run + livereloading : https://github.com/driftyco/ionic-cli/issues/984
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */
var buildWebpack = require('ionic-gulp-webpack');

gulp.task('watch', function (done) {
  buildWebpack({
    watch: true,
    statsOptions: {
      'colors': false,
      'errorDetails': true
    }
  }).then(done);
});

gulp.task('build', function (done) {
  buildWebpack().then(done);
});

gulp.task('clean', function () {
  return del('www');
});
