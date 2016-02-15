var gulp   = require('gulp'),
    config = require('./config');

// Locales task
gulp.task('locales', function() {
    return gulp.src(config.src.locales).pipe(gulp.dest(config.dest.locales));
});
