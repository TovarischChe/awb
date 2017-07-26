'use strict';

var autoprefixer = require('gulp-autoprefixer');
var gulp = require('gulp');
var gulpsync = require('gulp-sync')(gulp);
var sass = require('gulp-sass');
var minifyCss = require('gulp-clean-css');
var sourcemaps = require('gulp-sourcemaps');
var imagemin = require('gulp-imagemin');
var flatten = require('gulp-flatten');
var fileinclude = require('gulp-file-include');
var connect = require('gulp-connect');
var cssimport = require('gulp-cssimport');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var svgmin = require('gulp-svgmin');
var gulpif = require('gulp-if');

//var allRouters = require('./front_src/routes');

var NODE_ENV = process.env.NODE_ENV || 'dev';
var isDevelopment = NODE_ENV == 'dev' || NODE_ENV == 'test';

var path = {
    src: {
        style: './front_src/static/styles/*.*',
        styleFolder: './front_src/static/styles/',
        img: './front_src/static/images/**/*.*',
        svgIcons: './front_src/static/images/svg/icons/*.svg',
        fonts: './front_src/static/fonts/**/*.*',
        fontsFolder: './front_src/static/fonts/',
        vendorJS: './front_src/vendor/**/*.js',
        vendorHTML: './front_src/vendor/**/*.html'
    },
    build: {
        css: './web/styles/',
        img: './web/images/',
        fonts: './web/fonts/',
        html: './web/html/',
        js: './web/js/'
    },
    watch: {
        style: './front_src/**/**/**/**/*.sass',
        img: './front_src/static/images/**/*.*',
        fonts: './front_src/static/fonts/**/*.*',
        html: './front_src/html/**/*.*'
    }
};


gulp.task('sass', function () {
    gulp.src([
            path.src.style
        ])
        .pipe(plumber())
        .pipe(gulpif(isDevelopment, sourcemaps.init()))
        .pipe(sass({
            includePaths: require('node-bourbon').includePaths
        }).on('error', function(error){
            process.stderr.write(error.messageFormatted + '\n');
            process.exit(1)
        }))
        .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
        }))
        .pipe(concat('all.min.css'))
        .pipe(minifyCss({
            inline: 'remote'
        }, function(results) {
            if (results.errors.length > 0) {
                process.stderr.write('Error at gulp-clean-css' + '\n' + results.errors);
                process.exit(1);
            }
        }))
        .pipe(gulpif(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest(path.build.css))
});

gulp.task('images', function () {
    return gulp.src(path.src.img).pipe(gulp.dest(path.build.img));
});

gulp.task('vendor', function () {
    gulp.src(path.src.vendorHTML).pipe(gulp.dest(path.build.html));
    return gulp.src(path.src.vendorJS).pipe(gulp.dest(path.build.js));
});

gulp.task('svgmin', function () {
    return gulp.src(path.src.svgIcons)
        .pipe(svgmin())
        .pipe(gulp.dest('./front_src/static/images/svg/icons/'));
});

gulp.task('fonts', function () {
  return gulp
    .src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});

gulp.task('connect', function() {
    connect.server({
      root: 'web'
    });
});

gulp.task('fileinclude', function() {
  gulp.src(path.src.html)
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(path.build.html));
});

// watch
gulp.task('watch', function() {
    // gulp.watch(path.watch.style, function(event) {
    //     gulp.run('sass');
    // })
    gulp.watch(path.watch.style, ['sass']);
    gulp.watch(path.watch.img, ['images']);
    gulp.watch(path.watch.fonts, ['fonts']);
    //gulp.watch(path.watch.html, ['fileinclude']);
});

gulp.task('default', ['iconfont', 'images', 'fonts', 'sass', 'vendor']);

gulp.task('build', gulpsync.sync(['images', 'fonts', 'sass', 'vendor']));

gulp.task('devs', ['sass', 'images', 'watch', 'vendor']);

