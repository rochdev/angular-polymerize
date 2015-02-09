(function(angular) {
  'use strict';

  var module = angular.module('polymerize', []);

  module.provider('polymerize', ['$compileProvider', PolymerizeProvider]);

  /**
   * @ngdoc provider
   * @name polymerizeProvider
   * @kind object
   * @module polymerize
   *
   * @description
   * The {@link polymerize} service provider is used to configure directives automatically.
   */
  function PolymerizeProvider($compileProvider) {
    // Public methods
    this.$get = ['$parse', '$window', polymerizeFactory];
    this.directive = directive;

    /**
     * @ngdoc method
     * @name polymerizeProvider#directive
     * @kind function
     * @module polymerize
     *
     * @param {(string|Array)} name The name of the directive to create from a Polymer element.
     *
     * @description
     * The `directive` method.
     */
    function directive(name) {
      [].concat(name).forEach(function(directiveName) {
        $compileProvider.directive(directiveName, ['polymerize', function(polymerize) {
          return {
            link: polymerize.bind
          };
        }]);
      });
    }
  }

  function polymerizeFactory($parse, $window) {
    /**
     * @ngdoc service
     * @name polymerize
     * @kind object
     * @module polymerize
     *
     * @description
     * The `polymerize` service is used to bind an AngularJS directive to a Polymer element.
     */
    function Polymerize() {
      // Public methods
      this.bind = bind;

      /**
       * @ngdoc method
       * @name polymerize#bind
       * @kind function
       * @module polymerize
       *
       * @param {Object} scope The directive scope
       * @param {DOMElement} element The directive element
       * @param {Object} attrs The directive attributes
       *
       * @description
       * The `bind` method.
       */
      function bind(scope, element, attrs) {
        Object.keys(attrs.$attr).forEach(function(attr) {
          if (attrs.$attr[attr].indexOf('on-') === 0) {
            // Attach event handler
            element.on(attrs.$attr[attr].substr(3), function() {
              scope.$evalAsync(attrs[attr]);
            });
          } else {
            // Bind from AngularJS to Polymer
            scope.$watch(attrs[attr], function(value) {
              element[0][attr] = value;
            });

            // Bind from Polymer to AngularJS
            var observer = new $window.PathObserver(element[0], attr + '_');

            observer.open(function(newValue) {
              var setter = $parse(attrs[attr]).assign;

              setter(scope, newValue);

              scope.$apply();
            });
          }
        });
      }
    }

    return new Polymerize();
  }
})(window.angular);
