module.exports = function(config) {
  config.set({

    basePath: '',

    files: [
      'src/index.js',
      'src/**/*.spec.js',
    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome'],

    plugins: [
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-jasmine-html-reporter',
      'karma-webpack',
      'karma-sourcemap-loader'
    ],

    preprocessors: {
        'src/index.js': ['webpack', 'sourcemap'],
        'src/**/*.spec.js': ['webpack', 'sourcemap']
    },

    webpack: require('./webpack.config'),

    webpackMiddleware: {
      stats: 'errors-only'
    },

    reporters: ['progress', 'kjhtml'],
  });
};
