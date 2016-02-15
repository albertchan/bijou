var gulp = require('gulp'),
    requireDir = require('require-dir');

// helper to require files in directory
requireDir('./gulp');

// Gulp tasks
gulp.task('default', ['build', 'watch']);
gulp.task('build', ['locales', 'scripts', 'styles']);
