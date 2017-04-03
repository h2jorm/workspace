module.exports = function(config) {
  config.set({

    basePath: '',

    files: [
      'tmp/vendor.js',
      // https://github.com/nikku/karma-browserify/issues/67#issuecomment-84281528
      { pattern: 'src/index.js', watched: false },
      { pattern: 'src/**/*.spec.js', watched: false },
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
      'karma-sourcemap-loader'
    ],

    preprocessors: {
        'src/index.js': ['webpack', 'sourcemap'],
        'src/**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: require('./build/webpack.test'),

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: ['progress'],
  });
};
