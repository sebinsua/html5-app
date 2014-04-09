var bower = require('bower');
var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var jshint = require('gulp-jshint');
var karma = require('gulp-karma');
var protractor = require("gulp-protractor").protractor;

var paths = {
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

gulp.task('lint', function() {
  gulp.src(paths.js)
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('test', function() {
  gulp.src(["./test/e2e/**/*.js"])
      .pipe(protractor({
          configFile: "test/protractor.config.js",
          args: ['--baseUrl', 'http://127.0.0.1:8000']
      }))
      .on('error', function (e) {
        throw e;
      });
  // Be sure to return the stream
  return gulp.src(paths.karmaDeps.concat(paths.js)).pipe(karma({
    configFile: 'karma.conf.js',
    action: 'run'
  })).on('error', function (err) {
    // Make sure failed tests cause gulp to exit non-zero
    throw err;
  });
});



gulp.task('sass', function(done) {
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

gulp.task('watch', function() {
  gulp.watch(paths.sass, ['sass']);

  return gulp.src(paths.karmaDeps.concat(paths.js)).pipe(karma({
    configFile: 'karma.conf.js',
    action: 'watch'
  }));
});

gulp.task('init', function() {
  console.log('Installing latest stable release of Ionic from bower');
  return bower.commands.install();
});

gulp.task('default', ['lint', 'watch']);
