module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'chai', 'sinon-chai'],

    files: [
      'bower_components/webcomponentsjs/webcomponents.min.js',
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
