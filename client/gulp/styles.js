var gulp         = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano      = require('gulp-cssnano'),
    gulpif       = require('gulp-if'),
    plumber      = require('gulp-plumber'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    config       = require('./config');

// settings
var RELEASE = config.release;

// Styles task
gulp.task('styles', function() {
    return gulp.src(config.src.path.styles + 'app.sass')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write())
        .pipe(gulpif(RELEASE, cssnano()))
        .pipe(gulpif(RELEASE, rename(function(path) {
            path.basename += '.min';
        })))
        .pipe(gulp.dest(config.dest.styles));
});
