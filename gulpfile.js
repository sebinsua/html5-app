/*jshint node: true */
"use strict";

var bower = require('bower');

var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  jshint = require('gulp-jshint'),
  karma = require('gulp-karma'),
  protractor = require("gulp-protractor").protractor,
  livereload = require('gulp-livereload');

var paths = {
  destination: './www',
  sass: ['./scss/**/*.scss'],
  js: [
    'www/js/**/*.js',
    'test/unit/**/*.js'
  ],
  karmaDeps: [
    'www/lib/angular/angular.js',
    'www/lib/angular-animate/angular-animate.js',
    'www/lib/angular-sanitize/angular-sanitize.js',
    'www/lib/angular-ui-router/release/angular-ui-router.js',
    'www/lib/ionic/js/ionic.js',
    'www/lib/angular-mocks/angular-mocks.js'
  ]
};

gulp.task('init', function () {
  console.log('Installing latest stable release of Ionic from bower');
  return bower.commands.install();
});

gulp.task('lint', function () {
  gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test-e2e', ['test-unit'], function () {
  return gulp.src(["./test/e2e/**/*.js"])
    .pipe(protractor({
      configFile: "./test/protractor.config.js",
      args: ['--baseUrl', 'http://127.0.0.1:8080']
    }))
    .on('error', function (e) {
      throw e;
    });
});

gulp.task('test-unit', function () {
  // Be sure to return the stream
  return gulp.src(paths.karmaDeps.concat(paths.js)).pipe(karma({
    configFile: 'karma.conf.js',
    action: 'run'
  })).on('error', function (err) {
    // Make sure failed tests cause gulp to exit non-zero
    throw err;
  });
});

gulp.task('sass', function (done) {
  return gulp.src('./scss/ionic.app.scss')
    .pipe(sass())
    .pipe(gulp.dest('./www/css/'))
    .pipe(minifyCss({
      keepSpecialComments: 0
    }))
    .pipe(rename({ extname: '.min.css' }))
    .pipe(gulp.dest('./www/css/'))
    .on('end', done);
});

gulp.task('serve', function (next) {
  var connect = require('connect'),
      server = connect();
  server.use(connect.static(paths.destination)).listen(process.env.PORT || 8080, next);
});

gulp.task('watch-sass', function () {
  return gulp.watch(paths.sass, ['sass']);
});

gulp.task('watch-karma', function () {
  return gulp.src(paths.karmaDeps.concat(paths.js)).pipe(karma({
    configFile: 'karma.conf.js',
    action: 'watch'
  }));
});

gulp.task('watch-files', ['serve'], function () {
  var server = livereload();
  gulp.watch(paths.destination + '/**').on('change', function (file) {
    server.changed(file.path);
  });
});

gulp.task('emulate-ios', function () {
  var spawn = require('child_process').spawn;

  var ionicEmulateIos = spawn('ionic', ['emulate', 'ios']);
  ionicEmulateIos.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  ionicEmulateIos.stderr.on('data', function (data) {
    console.log('ERROR: ' + data.toString());
  });

  ionicEmulateIos.on('exit', function (code) {
    console.log('ionic exited with code ' + code);

    var tailingLog = spawn('tail', ['-f', './platforms/ios/cordova/console.log']);
    tailingLog.stdout.on('data', function (data) {
      console.log(data.toString());
    });
    tailingLog.stderr.on('data', function (data) {
      console.log('ERROR: ' + data.toString());
    });
  });
});

gulp.task('run-ios', function () {
  var spawn = require('child_process').spawn;

  var ionicRunIos = spawn('ionic', ['run', 'ios']);
  ionicRunIos.stdout.on('data', function (data) {
    console.log(data.toString());
  });

  ionicRunIos.stderr.on('data', function (data) {
    console.log('ERROR: ' + data.toString());
  });

  ionicRunIos.on('exit', function (code) {
    console.log('ionic exited with code ' + code);
  });
});

gulp.task('test', ['lint', 'test-unit', 'test-e2e']);
gulp.task('watch', ['watch-sass', 'watch-karma', 'watch-files']);
gulp.task('emulate', ['emulate-ios']);
gulp.task('run', ['run-ios']);
gulp.task('default', ['serve']);