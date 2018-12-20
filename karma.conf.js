/**
 * 执行全部测试用例: npm run tdd
 * 执行单个组件的测试用例: M=BreadcrumbItem npm run tdd
 */

const webpackConfig = {
  output: {
    pathinfo: true
  },
  mode: 'development',
  devtool: 'inline-source-map',
  entry: __dirname + '/test/index.js',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader?babelrc'],
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config => {
  const { env } = process;

  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['mocha'],
    files: ['test/html/*.html', 'test/index.js'],
    port: 9876,
    colors: true,
    autoWatch: true,
    logLevel: config.LOG_INFO,

    browsers: env.BROWSER ? env.BROWSER.split(',') : ['Chrome'],
    customLaunchers: {
      ChromeCi: {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    },
    preprocessors: {
      'test/html/*.html': 'html2js',
      'test/index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true
    }
  });
};
