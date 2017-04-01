module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha', 'sinon-chai'],
        reporters: ['mocha'],
        files: [
            'test/html/*.html',
            'test/index.js'
        ],

        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,

        logLevel: config.LOG_INFO,

        browsers: ['Chrome'],

        preprocessors: {
            'test/html/*.html': 'html2js',
            'test/index.js': ['webpack', 'sourcemap']
        },

        webpack: {
            devtool: 'inline-source-map',

            entry: __dirname + '/test/index.js',
            module: {
                rules: [
                    {
                        test: /.js$/,
                        use: [
                            'babel-loader?babelrc'
                        ],
                        exclude: /node_modules/
                    }
                ]
            }
        },

        webpackServer: {
            noInfo: true
        }

    });
};
