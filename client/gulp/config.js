var argv = require('minimist')(process.argv.slice(2)),
    babelify = require('babelify');

// file locations
module.exports = {
    vendors: [
        { require: 'classnames', expose: 'classnames' },
        { require: 'i18next', expose: 'i18next' },
        { require: 'i18next-xhr-backend', expose: 'i18next-xhr-backend' },
        { require: 'lodash', expose: 'object-assign' },
        { require: 'object-assign', expose: 'object-assign' },
        { require: 'react', expose: 'react' },
        { require: 'react-dom', expose: 'react-dom' },
        { require: 'react-redux', expose: 'react-redux' },
        { require: 'react-router', expose: 'react-router' },
        { require: 'react-router-redux', expose: 'react-router-redux' },
        { require: 'redux', expose: 'redux' },
        { require: 'redux-thunk', expose: 'redux-thunk' },
        { require: 'store', expose: 'store' }
    ],
    src: {
        scripts: ['./scripts/**/*'],
        styles:  ['./styles/**/*'],
        fonts:   ['../assets/fonts/**/*'],
        locales: ['../locales/**/*.json'],
        path: {
            styles: ['./styles/']
        }
    },
    dest: {
        fonts:   '../public/fonts',
        locales: '../public/locales/',
        scripts: '../public/js/',
        styles:  '../public/css/',
        vendors: './vendors.js'
    },
    browserify: {
        // extensions
        extensions: ['.js', '.jsx'],
        // source maps
        debug: false,
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
