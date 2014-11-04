var gulp        = require('gulp'),
    $           = require('gulp-load-plugins')(),
    karma       = require('karma').server,
    browserify  = require('browserify'),
    source      = require('vinyl-source-stream'),
    streamify   = require('gulp-streamify'),
    paths       = require('./paths.config.js');


//lint src files
gulp.task('lint', function(){
  return gulp.src(paths.app_files.scripts)
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'))
    .pipe($.notify({message: 'Linting Done'}))
    .pipe($.livereload());
});

//bundle src files
gulp.task('browserify', function(){
  return browserify(paths.app_files.index)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest(paths.build.scripts));
});

//compile sass files
gulp.task('sass', function(){
  return gulp.src(paths.app_files.styles)
    .pipe($.sass())
    .pipe(gulp.dest(paths.build.styles));
});

//run tests once
gulp.task('test', function(done){
  karma.start({
    configFile: __dirname +'/karma.conf.js',
    singleRun: true
  });
});

//run tests on every file change
gulp.task('tdd', function(done){
  karma.start({
    configFile: __dirname+'/karma.conf.js',
  }, done);
});

//watch changes to source files
gulp.task('watch', function(){
  gulp.watch(paths.app_files.scripts, ['lint', 'browserify']);
  gulp.watch(paths.app_files.styles, ['sass']);
});

//build files
gulp.task('build', ['sass', 'blint', 'browserify']);

//default is to build and watch
gulp.task('default', ['build', 'watch']);