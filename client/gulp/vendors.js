var gulp       = require('gulp'),
    browserify = require('browserify'),
    buffer     = require('vinyl-buffer'),
    gulpif     = require('gulp-if'),
    rename     = require('gulp-rename'),
    uglify     = require('gulp-uglify'),
    source     = require('vinyl-source-stream'),
    config     = require('./config');

// settings
var RELEASE = config.release;

// Vendors task
gulp.task('vendors', function() {
    var vendors = config.vendors;
    var bundler = browserify({
        // no source maps for vendor libs
        debug: false
    });

    vendors.forEach(function(vendor) {
        // bundler.require(vendor);
        if (vendor.expose !== null) {
            bundler.require(vendor.require, {
                expose: vendor.expose
            });
        } else {
            bundler.require(vendor.require);
        }
    });

    return bundler.bundle()
        .pipe(source(config.dest.vendors))
        .pipe(buffer())
        .pipe(gulpif(RELEASE, uglify()))
        .pipe(gulpif(RELEASE, rename(function(path) {
            path.basename += '.min';
        })))
        .pipe(gulp.dest(config.dest.scripts));
});
