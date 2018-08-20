'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var server = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var minify = require('gulp-csso');
var rename = require('gulp-rename');
var del = require('del');
var run = require('run-sequence');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('images', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(imagemin([
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.jpegtran({progressive: true}),
      imagemin.svgo()
    ]))
    .pipe(gulp.dest('build/img'));
});

gulp.task('html', function () {
  return gulp.src('source/*.html')
      .pipe(gulp.dest('build'))
      .pipe(server.stream());
});

gulp.task('copy', function () {
  return gulp.src([
      'source/fonts/**/*.{woff,woff2}',
      'source/img/**',
      'source/backend/*.json'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('clean', function () {
  return del('build');
});

gulp.task('style', function() {
  gulp.src('source/sass/style.scss')
    .pipe(plumber())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('build/css'))
    .pipe(minify())
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css'))
    .pipe(server.stream());
});

gulp.task('scripts', function () {
  return gulp.src(['source/js/picturefill/*.js', 'source/js/plugins/*.js', 'source/js/scripts/*.js'])
      .pipe(concat('script.js'))
      .pipe(gulp.dest('build/js'))
      .pipe(rename('script.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('build/js'))
      .pipe(server.stream());
});

gulp.task('serve', function() {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', ['style']);
  gulp.watch('source/js/**/*.js', ['scripts']);
  gulp.watch('source/*.html', ['html']);
});

gulp.task('build', function (done) {
  run(
  'clean',
  'html',
  'copy',
  'style',
  'scripts',
  'images',
  done
  );
});
