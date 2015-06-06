(function() {
  'use strict';

  var registry = [];
  var windowName = window.name;

  window.name = 'NG_DEFER_BOOTSTRAP!' + windowName;

  setTimeout(function() {
    var registerElement = document.registerElement;

    document.registerElement = function(name) {
      registry.push(name);
      registerElement.apply(this, arguments);
    };
  });

  window.addEventListener('WebComponentsReady', function() {
    var module = angular.module('polymerize', []);

    module.provider('polymerize', [
      '$compileProvider', PolymerizeProvider
    ]);

    window.name = windowName;
    window.angular.resumeBootstrap();

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
      this.$get = ['$injector', polymerizeFactory];
      this.directive = directive;

      registry.forEach(function(name) {
        directive(name);
      });

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
          $compileProvider.directive(camelCase(name), ['polymerize', function(polymerize) {
            return {
              link: polymerize.link
            };
          }]);
        });
      }
    }

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
    function Polymerize($parse) {
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
            attachHandler(attr);
          } else if (Object.keys(element[0]._config).indexOf(attr) !== -1) {
            bind(attr);
          }
        });

        function attachHandler(attr) {
          element.on(attrs.$attr[attr].substr(3), function(e) {
            scope.$evalAsync(attrs[attr], {
              $event: e
            });
          });
        }

        function bind(attr) {
          var getter = $parse(attrs[attr]);

          scope.$watch(attrs[attr], function(value) {
            element[0][attr] = value;
          });

          if (getter.assign) {
            element.on(attr + '-changed', function(e) {
              getter.assign(scope, e.detail.value);
            });
          }
        }
      }
    }

    function polymerizeFactory($injector) {
      return $injector.instantiate(['$parse', Polymerize]);
    }

    function camelCase(str) {
      str = str.trim();

      if (str.length === 1 || !(/[_.\- ]+/).test(str)) {
        return str;
      }

      return str
        .replace(/^[_.\- ]+/, '')
        .toLowerCase()
        .replace(/[_.\- ]+(\w|$)/g, function(m, p1) {
          return p1.toUpperCase();
        });
    }
  });
})();
