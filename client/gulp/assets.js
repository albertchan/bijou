var gulp   = require('gulp'),
    config = require('./config');

// Locales task
gulp.task('assets', function() {
    return gulp.src(config.src.fonts).pipe(gulp.dest(config.dest.fonts));
});
