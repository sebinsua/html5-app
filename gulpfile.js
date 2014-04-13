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
  sass: [
    './scss/*.scss',
    './scss/**/*.scss'
  ],
  js: [
    'www/js/**/*.js'
  ],
  karmaDeps: [
    'test/unit/**/*.js',
    'www/lib/angular/angular.js',
    'www/lib/angular-animate/angular-animate.js',
    'www/lib/angular-sanitize/angular-sanitize.js',
    'www/lib/angular-ui-router/release/angular-ui-router.js',
    'www/lib/ionic/js/ionic.js',
    'www/lib/angular-mocks/angular-mocks.js'
  ]
};

gulp.task('init', function (done) {
  console.log('Installing latest stable release of Ionic from bower');
  return bower.commands.install().on('end', done);
});

gulp.task('lint', function (done) {
  gulp.src(paths.js)
      .pipe(jshint())
      .pipe(jshint.reporter('default'))
      .on('end', done);
});

gulp.task('test-e2e', function (done) {
  gulp.src(["./test/e2e/**/*.js"])
      .pipe(protractor({
        configFile: "./test/protractor.config.js",
        args: ['--baseUrl', 'http://127.0.0.1:8080']
      }))
      .on('error', function (e) {
        throw e;
      })
      .on('end', done);
});

gulp.task('test-unit', function (done) {
  // Be sure to return the stream
  gulp.src(paths.karmaDeps.concat(paths.js))
      .pipe(karma({ configFile: 'karma.conf.js', action: 'run' }))
      .on('error', function (err) { throw err; })
      .on('end', done);
});

gulp.task('sass', function (done) {
  gulp.src('./scss/ionic.app.scss')
      .pipe(sass())
      .pipe(gulp.dest('./www/css/'))
      .pipe(minifyCss({
        keepSpecialComments: 0
      }))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest('./www/css/'))
      .on('end', done);
});

gulp.task('serve', function (done) {
  var connect = require('connect'),
      server = connect();
  server.use(connect.static(paths.destination))
        .listen(process.env.PORT || 8080, done);
});

gulp.task('watch-lint', function (done) {
  gulp.watch(paths.js, ['lint'])
      .on('end', done);
});

gulp.task('watch-sass', function (done) {
  gulp.watch(paths.sass, ['sass'])
      .on('end', done);
});

gulp.task('watch-karma', function (done) {
  gulp.src(paths.karmaDeps.concat(paths.js))
      .pipe(karma({ configFile: 'karma.conf.js', action: 'watch' }))
      .on('end', done);
});

gulp.task('watch-files', ['serve'], function (done) {
  var server = livereload();
  gulp.watch(paths.destination + '/**')
      .on('change', function (file) { server.changed(file.path); })
      .on('end', done);
});

gulp.task('emulate-ios', ['sass'], function (done) {
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
    tailingLog.on('exit', done);
  });
});

gulp.task('run-ios', ['sass'], function (done) {
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
    done();
  });
});

gulp.task('test', ['lint', 'test-unit', 'test-e2e']);
gulp.task('emulate', ['emulate-ios']);
gulp.task('run', ['run-ios']);

gulp.task('watch-test', ['watch-lint', 'watch-sass', 'watch-karma', 'watch-files']);
gulp.task('watch-serve', ['watch-sass', 'watch-files', 'serve']);

gulp.task('default', ['watch-serve']);