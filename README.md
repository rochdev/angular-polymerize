# Polymerize [![Build][build-image]][build-url] [![Dependencies][deps-image]][deps-url] [![Version][version-image]][version-url] [![License][license-image]][license-url]

[![Greenkeeper badge](https://badges.greenkeeper.io/rochdev/angular-polymerize.svg)](https://greenkeeper.io/)

Creates [AngularJS][angular-url] directives with two-way data binding from [Polymer][polymer-url] elements so that they can be used in an AngularJS application.

## Installation

```sh
$ bower install angular-polymerize
```

## Usage

By default, all custom elements are automatically registered as AngularJS directives, which means you can use them as any other AngularJS directive:

```html
<paper-input value="val" on-change="onChange(val)">
```

Please note that for this to work, Polymerize must be loaded before Polymer.

## Advanced configuration

If you need to register an element that was unavailable when the `polymer-ready` event was fired, you can use `polymerizeProvider` to do so:

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

If you need to create your own directive on top of a Polymer element you may use the `polymerize` service directly from the directive instead:

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

## Example

See the [example](example) folder for a complete example.

## License

[MIT License][license-url]

[angular-url]: https://angularjs.org
[bootstrap-url]: https://docs.angularjs.org/api/ng/function/angular.bootstrap
[build-image]: http://img.shields.io/travis/rochdev/angular-polymerize/master.svg?style=flat-square
[build-url]: https://travis-ci.org/rochdev/angular-polymerize
[deps-image]: https://img.shields.io/gemnasium/rochdev/angular-polymerize.svg?style=flat-square
[deps-url]: https://gemnasium.com/rochdev/angular-polymerize
[license-image]: http://img.shields.io/badge/license-MIT-red.svg?style=flat-square
[license-url]: http://en.wikipedia.org/wiki/MIT_License
[ngapp-url]: https://docs.angularjs.org/api/ng/directive/ngApp
[polymer-url]: https://www.polymer-project.org
[version-image]: https://img.shields.io/github/tag/rochdev/angular-polymerize.svg?style=flat-square
[version-url]: https://github.com/rochdev/angular-polymerize