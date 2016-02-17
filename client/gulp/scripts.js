var gulp       = require('gulp'),
    babelify   = require('babelify'),
    browserify = require('browserify'),
    notify     = require('gulp-notify'),
    source     = require('vinyl-source-stream'),
    config     = require('./config');

// Build scripts task
gulp.task('scripts', function() {
    var browserifyConf = config.browserify;
    var browserifyThis = function(bundleConfig) {
        var bundler = browserify({
            cache: {},
            extensions: browserifyConf.extensions,
            packageCache: {},
            debug: browserifyConf.debug, // produce source maps?
            entries: bundleConfig.entries,
            fullPaths: browserifyConf.fullPaths,
            transform: [babelify.configure(browserifyConf.babelify)]
        });

        bundler.transform(babelify);
        bundler.add(bundleConfig.entries);

        config.vendors.forEach(function(vendor) {
            bundler.external(vendor.require);
        });

        var bundle = function() {
            return bundler.bundle()
                .on('error', HandleErrors)
                .pipe(source(bundleConfig.outputName))
                .pipe(gulp.dest(bundleConfig.destFolder));
        };

        return bundle();
    };

    browserifyConf.bundleConfigs.forEach(browserifyThis);
});

// Helpers
function HandleErrors() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
        title: "Compile Error",
        message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
}
