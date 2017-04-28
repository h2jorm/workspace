module.exports = function(config) {
  config.set({

    basePath: '',

    files: [
      {pattern: 'tmp/*', included: false, watched: false},
      {pattern: 'tmp/vendor.js', included: true},
      // https://github.com/nikku/karma-browserify/issues/67#issuecomment-84281528
      {pattern: 'src/index.js', watched: false},
      {pattern: 'src/**/*.spec.js', watched: false},
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    client: {
      clearContext: false,
    },

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-webpack',
      'karma-sourcemap-loader',
      'karma-jasmine-html-reporter',
      'karma-coverage-istanbul-reporter',
    ],

    preprocessors: {
        'src/index.js': ['webpack', 'sourcemap'],
        'src/**/*.spec.js': ['webpack', 'sourcemap'],
    },

    webpack: require('./build/webpack.test'),

    webpackMiddleware: {
      stats: 'errors-only',
    },

    reporters: ['progress', 'kjhtml', 'coverage-istanbul'],

    coverageIstanbulReporter: {
        reports: ['html'],
        dir: 'coverage/',
        fixWebpackSourcePaths: true,
    },
  });
};
