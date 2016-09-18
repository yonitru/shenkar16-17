//gulp.js configuration

//include gulp and plugins
var gulp    = require('gulp'),
imagemin    = require('gulp-imagemin'),
newer       = require('gulp-newer'),
pkg         = require('./package.json'),
preprocess  = require('gulp-preprocess');

//file locations
var 
    devBuild = ((process.env.NODE_ENV || 'development').trim().toLowerCase() !== 'production'),
    source   = 'source/',
    dest     = 'build/',

    html = {
      in: source + '*.html',
      watch: [source + '*.html', source + 'template/**/*'],
      out: dest,
      context: {
        devBuild: devBuild,
        author: pkg.author,
        version:pkg.version
      }
    },

    images   = {
      in: source + 'images/*.*',
      out: dest + 'images/'
    };

//show build type
console.log(pkg.name + ' ' + pkg.version + ', ' + (devBuild ? 'development' : 'production') + ' build');

//build HTML files
gulp.task('html',function() {
  return gulp.src(html.in)
  .pipe(preprocess({context: html.context}))
  .pipe(gulp.dest(html.out))
});

//manage images
gulp.task('images', function() {
  return gulp.src(images.in)
    .pipe(newer(images.out))
    .pipe(imagemin())
    .pipe(gulp.dest(images.out));
});

//---default task---
gulp.task('default', ['html','images'], function() {

  //html changes
  gulp.watch(html.watch, ['html']);
   
  //images changes
  gulp.watch(images.in, ['images']);
});