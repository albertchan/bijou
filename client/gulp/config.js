var argv = require('minimist')(process.argv.slice(2)),
    babelify = require('babelify');

// file locations
module.exports = {
    src: {
        scripts: ['./scripts/**/*'],
        styles:  ['./styles/**/*'],
        locales: ['../locales/**/*.json']
    },
    dest: {
        locales: '../public/locales/',
        scripts: '../public/js/',
        styles:  '../public/css/',
        vendors: './vendors.js'
    },
    browserify: {
        // extensions
        extensions: ['.js', '.jsx'],
        // source maps
        debug: true,
        fullPaths: true,
        // A separate bundle will be generated for config
        bundleConfigs: [{
            entries:    './scripts/app.js',
            destFolder: '../public/js/',
            outputName: 'app.js'
        }],
        babelify: {
            optional: ['es7.classProperties', 'es7.decorators']
        }
    },
    release: !!argv.release
};
