(function () {
  "use strict";

  var controllers = angular.module('spokes.controllers', []);

  controllers.controller('LoadingScreenCtrl', ['$scope', function ($scope) {
    console.log("Loading Screen: This is executed.");
  }]);

  controllers.controller('AppCtrl', ['$scope', function ($scope) {
    console.log("App: This is executed.");
  }]);

  controllers.controller('HomeCtrl', ['$scope', '$ionicNavBarDelegate', function ($scope, $ionicNavBarDelegate) {
    console.log("Home: This is executed.");
    $ionicNavBarDelegate.back(false);

    $scope.items = [
      "Word",
      "Other",
      "Thing"
    ];
  }]);

})();