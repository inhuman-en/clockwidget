module.exports = function(config) {
    config.set({
        basePath: '',
        frameworks: ['jasmine'],
        files: [
            'node_modules/webcomponentsjs/lite.js',
            'clock/*.element.js',
            'clock/*.test.js'
        ],
        exclude: [],
        preprocessors: {},
        reporters: ['dots'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        browsers: ['Chrome'],
        singleRun: false
    });
};
