/* jshint expr:true */
/* global describe */
/* global beforeEach */
/* global it */
/* global expect */
/* global sinon */

// TODO: use Polymer in tests

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
    provider.directive('colorPicker');

    expect(function() {
      $injector.get('colorPickerDirective');
    }).not.to.throw();
  });

  it('should register directives provided with an array of names', function() {
    provider.directive(['colorPicker']);

    expect(function() {
      $injector.get('colorPickerDirective');
    }).not.to.throw();
  });
});

describe('Polymerize', function() {
  'use strict';

  var $compile;
  var $element;
  var $scope;
  var $rootScope;
  var polymerize;

  beforeEach(angular.mock.module('polymerize'));

  beforeEach(angular.mock.inject(function(_$compile_, _$rootScope_, _polymerize_) {
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $scope = $rootScope.$new();

    polymerize = _polymerize_;
  }));

  it('should bind from AngularJS to Polymer', function() {
    $scope.color = 'red';
    $element = angular.element('<color-picker color="color">');

    var attrs = {
      $attr: {
        color: 'color'
      },
      color: 'color'
    };

    polymerize.link($scope, $element, attrs);

    $rootScope.$digest();

    expect($element).to.have.attr('color', 'red');

    $scope.color = 'blue';

    $rootScope.$digest();

    expect($element).to.have.attr('color', 'blue');
  });

  it('should bind from Polymer to AngularJS', function(done) {
    $scope.color = 'red';
    $element = angular.element('<color-picker color="color">');

    var attrs = {
      $attr: {
        color: 'color'
      },
      color: 'color'
    };

    polymerize.link($scope, $element, attrs);

    $rootScope.$digest();

    $element[0].color = 'blue';
    $element[0].color_ = 'blue';

    setTimeout(function() {
      expect($scope.color).to.equal('blue');
      done();
    }, 10);
  });

  it('should handle events defined as `on-event`', function() {
    $scope.onChange = sinon.spy();
    $element = angular.element('<color-picker on-change="onChange()">');

    var attrs = {
      $attr: {
        onChange: 'on-change'
      },
      onChange: 'onChange()'
    };

    polymerize.link($scope, $element, attrs);

    $rootScope.$digest();

    $element[0].dispatchEvent(new Event('change'));

    $rootScope.$digest();

    expect($scope.onChange).to.have.been.called;
  });
});
