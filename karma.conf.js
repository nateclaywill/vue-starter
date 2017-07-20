// ------------------------------------------------------------------------------
// karma.conf.js
//
// Configuration for karma testing framework.
// ------------------------------------------------------------------------------

// Import webpack config for karma setup
const webpackConfig = require('./webpack.config');

module.exports = (config) => {
    config.set({
        browsers: ['PhantomJS'],
        files: ['client/app/**/*.test.js'],
        frameworks: ['mocha', 'chai'],
        plugins: [
            // Test frameworks
            'karma-mocha',
            'karma-chai',

            // Build tools
            'karma-webpack',
            'karma-sourcemap-loader',

            // Reporters
            'karma-spec-reporter',
            'karma-coverage',

            // Browser launchers
            'karma-phantomjs-launcher'
        ],
        preprocessors: {
            'client/app/**/*.test.js': ['webpack', 'sourcemap']
        },
        reporters: ['spec', 'coverage'],
        webpackMiddleware: {
            noInfo: true
        },
        webpack: webpackConfig
    });
};

// ------------------------------------------------------------------------------

