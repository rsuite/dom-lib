module.exports = function (config) {
  const { env } = process;
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
    logLevel: config.LOG_INFO,
    browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome'],
    customLaunchers: {
      ChromeCi: {
        base: 'Chrome',
        flags: ['--no-sandbox'],
      },
    },
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
