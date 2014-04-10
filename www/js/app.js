(function () {
  "use strict";

  var spokes = angular.module('spokes', ['ionic', 'spokes.controllers']);

  spokes.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('loading-screen', {
        url: "/",
        templateUrl: "./templates/loading-screen.html",
        controller: 'LoadingScreenCtrl'
      })
      .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: "./templates/menu.html",
        controller: 'AppCtrl'
      })
      .state('app.home', {
        url: '/home',
        views: {
          menuContent: {
            templateUrl: "./templates/home.html",
            controller: 'HomeCtrl'
          }
        }
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
