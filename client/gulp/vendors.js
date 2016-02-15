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

// vendor dependencies
var vendors = [
    { require: 'classnames', expose: 'classnames' },
    { require: 'object-assign', expose: 'object-assign' },
    { require: 'react', expose: 'react' },
    { require: 'react-dom', expose: 'react-dom' }
];

// Vendors task
gulp.task('vendors', function() {
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
