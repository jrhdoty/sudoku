var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    karma       = require('karma').server,
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    streamify   = require('gulp-streamify'),
    paths       = require('./paths.config.js');



gulp.task('lint', function(){
  return gulp.src(paths.app_files.scripts)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.notify({message: 'Linting Done'}))
    .pipe($.livereload());
});