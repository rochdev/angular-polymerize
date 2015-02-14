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
   * The {@link polymerize} service provider is used to configure directives
   * automatically.
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
     * @param {(string|Array)} names The name(s) of the directive(s) to create.
     *
     * @description
     * Create one or several directives from Polymer elements.
     */
    function directive(names) {
      [].concat(names).forEach(function(name) {
        $compileProvider.directive(name, ['polymerize', function(polymerize) {
          return {
            link: polymerize.link
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
     * The `polymerize` service is used to bind AngularJS directives to
     * Polymer elements.
     */
    function Polymerize() {
      // Public methods
      this.link = link;

      /**
       * @ngdoc method
       * @name polymerize#link
       * @kind function
       * @module polymerize
       *
       * @param {Object} scope The directive scope
       * @param {DOMElement} element The directive element
       * @param {Object} attrs The directive attributes
       *
       * @description
       * Bind an AngularJS directive to a Polymer element.
       */
      function link(scope, element, attrs) {
        Object.keys(attrs.$attr).forEach(function(attr) {
          if (attrs.$attr[attr].indexOf('on-') === 0) {
            // Attach event handler
            element.on(attrs.$attr[attr].substr(3), function() {
              scope.$evalAsync(attrs[attr]);
            });
          } else {
            // Bind from AngularJS to Polymer
            scope.$watch(attrs[attr], function(value) {
              element.attr(attr, value);
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
