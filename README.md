# Polymerize [![Build][build-image]][build-url] [![Version][version-image]][version-url] [![License][license-image]][license-url]

Creates [AngularJS][angular-url] directives from [Polymer][polymer-url] elements so that they can be used in an AngularJS application.

## Configuration

The easiest way to use Polymerize is to use the provider to create the directives automatically for you:

```js
var module = angular.module('app', ['polymerize']);

module.config(function(polymerizeProvider) {
  polymerizeProvider.directive('paperButton'); // single directive
  polymerizeProvider.directive([
    'paperCheckbox',
    'paperInput'
  ]); // multiple directives
});
```

If you need to create your own directive on top of a Polymer element you may use the service directly from the directive instead:

```js
var module = angular.module('app', ['polymerize']);

module.directive('paperButton', function(polymerize) {
  return {
    restrict: 'E',
    link: function postLink(scope, element, attrs) {
      // your code

      polymerize.link(scope, element, attrs);
    }
  };
});
```

## Usage

Once configured, you can simply use the Polymer element as any other AngularJS directive:

```html
<paper-input value="val" on-change="onChange(val)">
```

## Bootstrapping

Please note that if you want to use browsers other than Chrome, you cannot use [ngApp][ngapp-url] and must bootstrap only after Polymer is ready. Polymerize provides a helper to do so which works the same as [angular.bootstrap][bootstrap-url] but waits for Polymer to be ready.

```js
Polymerize.bootstrap(document, ['app']);
```

## Example

See the [example](example) folder for a complete example.

## License

[MIT License][license-url]

[angular-url]: https://angularjs.org
[bootstrap-url]: https://docs.angularjs.org/api/ng/function/angular.bootstrap
[build-image]: http://img.shields.io/travis/rochdev/angular-polymerize/master.svg?style=flat-square
[build-url]: https://travis-ci.org/rochdev/angular-polymerize
[license-image]: http://img.shields.io/badge/license-MIT-red.svg?style=flat-square
[license-url]: http://en.wikipedia.org/wiki/MIT_License
[ngapp-url]: https://docs.angularjs.org/api/ng/directive/ngApp
[polymer-url]: https://www.polymer-project.org
[version-image]: https://img.shields.io/github/release/rochdev/angular-polymerize.svg
[version-url]: https://github.com/rochdev/angular-polymerize