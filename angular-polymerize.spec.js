/* jshint expr:true */
/* global describe */
/* global beforeEach */
/* global it */
/* global expect */

describe('Polymerize provider', function() {
  'use strict';

  var provider;
  var $injector;

  beforeEach(angular.mock.module('polymerize', function(polymerizeProvider) {
    provider = polymerizeProvider;
  }));

  beforeEach(angular.mock.inject(function(_$injector_) {
    $injector = _$injector_;
  }));

  it('should register directives provided by name', function() {
    provider.directive('paperButton');

    expect(function() {
      $injector.get('paperButtonDirective');
    }).not.to.throw();
  });

  it('should register directives provided with an array of names', function() {
    provider.directive(['paperButton']);

    expect(function() {
      $injector.get('paperButtonDirective');
    }).not.to.throw();
  });
});

describe('Polymerize', function() {
  'use strict';

  var polymerize;

  beforeEach(angular.mock.module('polymerize'));
  beforeEach(angular.mock.inject(function(_polymerize_) {
    polymerize = _polymerize_;
  }));

  it('should', function() {

  });
});
