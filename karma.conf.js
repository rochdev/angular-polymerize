module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon-chai', 'chai-jquery'],

    files: [
      'bower_components/observe-js/src/observe.js',
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'angular-polymerize.js',
      'angular-polymerize.spec.js'
    ],

    reporters: ['mocha'],

    mochaReporter: {
      output: 'autowatch'
    },

    autoWatch: true,

    browsers: ['Chrome']
  });
};
