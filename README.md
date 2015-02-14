# Polymerize [![License][license-image]][license-url]

Creates [AngularJS][angular-url] directives from [Polymer][polymer-url] elements so that they can be used in an AngularJS application.

## Work In Progress

Works only in Chrome right now but support for other browsers is coming.

## Usage

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

Then you can simply use as any other AngularJS directive:

```html
<paper-input value="val" on-change="onChange(val)">
```

## Example

See the [example](example) folder for a complete example.

## License

[MIT License][license-url]

[angular-url]: https://angularjs.org
[build-image]: http://img.shields.io/travis/rochdev/angular-polymerize/master.svg?style=flat-square
[build-url]: https://travis-ci.org/rochdev/angular-polymerize
[license-image]: http://img.shields.io/badge/license-MIT-red.svg?style=flat-square
[license-url]: http://en.wikipedia.org/wiki/MIT_License
[polymer-url]: https://www.polymer-project.org
[version-image]: http://img.shields.io/badge/release-0.0.0-orange.svg?style=flat-square
[version-url]: https://github.com/rochdev/angular-polymerize