(function(angular) {
  'use strict';

  window.Polymerize = Polymerize;

  var module = angular.module('polymerize', []);

  module.provider('polymerize', [
    '$compileProvider', '$windowProvider', PolymerizeProvider
  ]);

  deferBootstrap();

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
  function PolymerizeProvider($compileProvider, $windowProvider) {
    // Public methods
    this.$get = ['$injector', polymerizeFactory];
    this.directive = directive;

    $windowProvider.$get().Polymer.elements.forEach(function(element) {
      directive(camelCase(element.name));
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
        $compileProvider.directive(name, ['polymerize', function(polymerize) {
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
  function Polymerize($parse, $rootScope, $timeout, $window) {
    // Public methods
    this.link = link;

    keepInSync();

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
      var host = $window.wrap(element[0]);

      Object.keys(attrs.$attr).forEach(function(attr) {
        if (attrs.$attr[attr].indexOf('on-') === 0) {
          attachHandler(attr);
        } else if (host._publishNames.indexOf(attr) !== -1) {
          var getter = $parse(attrs[attr]);

          if (getter.assign) {
            bindToPolymer(attr);
            bindToAngular(attr);
          } else {
            host[attr] = getter(scope);
          }
        }
      });

      function attachHandler(attr) {
        element.on(attrs.$attr[attr].substr(3), function() {
          scope.$evalAsync(attrs[attr]);
        });
      }

      function bindToPolymer(attr) {
        var observer = new $window.PathObserver(scope, attrs[attr]);

        host.bind(attrs.$attr[attr], observer);
      }

      function bindToAngular(attr) {
        var observer = new $window.PathObserver(host, attr);

        observer.open(function() {
          scope.$apply();
        });
      }
    }

    function keepInSync() {
      if ($window.Platform && Object.observe === undefined) {
        $rootScope.$watch(function() {
          $timeout(function() {
            $window.Platform.performMicrotaskCheckpoint();
          }, 0, false);
        });
      }
    }
  }

  function polymerizeFactory($injector) {
    return $injector.instantiate([
      '$parse', '$rootScope', '$timeout', '$window', Polymerize
    ]);
  }

  function deferBootstrap() {
    var name = window.name;

    window.name = 'NG_DEFER_BOOTSTRAP!' + name;

    window.addEventListener('polymer-ready', function() {
      window.name = name;

      angular.resumeBootstrap();
    });
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
})(window.angular);
