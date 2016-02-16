var gulp   = require('gulp'),
    config = require('./config');

// Watch task
gulp.task('watch', ['build'], function() {
    gulp.watch(config.src.locales, ['locales']);
    gulp.watch(config.src.scripts, ['scripts']);
    gulp.watch(config.src.styles, ['styles']);
});