(function () {
  "use strict";

  var spokes = angular.module('spokes', ['ionic', 'spokes.controllers']);

  spokes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('app', {
      url: "/",
      templateUrl: "./templates/loading-screen.html",
      controller: 'LoadingScreenCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

  }]);

  spokes.run(['$ionicPlatform', function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }]);

})();
