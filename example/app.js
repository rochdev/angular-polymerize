angular.module('demo', ['polymerize'])
  .controller('DemoController', function($scope) {
    $scope.myColor = 'red';
    $scope.changeColor = function() {
      $scope.myColor = $scope.myColor === 'blue' ? 'red' : 'blue';
    };

    $scope.onColorChange = function(color) {
      console.log('Color changed to ' + color);
    };
  })
  .config(function(polymerizeProvider) {
    polymerizeProvider.directive([
      'paperButton',
      'colorPicker'
    ]);
  });
