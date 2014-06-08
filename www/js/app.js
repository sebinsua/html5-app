(function () {
  "use strict";

  var app = angular.module('app', [
    'ngCordova',
    'ionic',
    'restangular',
    'angularMoment',
    'app.services',
    'app.factories',
    'app.controllers'
  ]);

  app.constant('angularMomentConfig', {
    preprocess: 'unix', // optional
    timezone: 'Europe/London' // optional
  });

  app.config([
    'RestangularProvider',
    '$stateProvider',
    '$urlRouterProvider',
    function (RestangularProvider, $stateProvider, $urlRouterProvider) {
      RestangularProvider.setBaseUrl('http://localhost:3000/api/');

      $stateProvider
        .state('loading-screen', {
          url: "/",
          templateUrl: "./templates/loading-screen.html",
          controller: 'LoadingScreenCtrl'
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/');

    }
  ]);

  app.run([
    '$window',
    '$ionicPlatform',
    '$rootScope',
    '$state',
    'Restangular',
    function ($window, $ionicPlatform, $rootScope, $state, Restangular) {
      Restangular.setErrorInterceptor(function (response) {
        if (response.status == 401) {
          $rootScope.$broadcast('event:auth-login-required');
        }
      });

      Restangular.setFullRequestInterceptor(function (element, operation, route, url, headers, params) {
        var currentAccount = {
          idToken: 'fake-token'
        };

        var newHeaders = {};
        if (currentAccount) {
          newHeaders = {
            Authorization: 'Bearer ' +  currentAccount.idToken
          };
        }

        return {
          element: element,
          operation: operation,
          route: route,
          url: url,
          headers: _.extend(headers, newHeaders),
          params: params
        };
      });

      $rootScope.$on('event:auth-login-required', function () {
        console.log("Login required.");
        $state.go('value-proposition', {}, { location: "replace" });
      });

      $rootScope.$on('event:auth-login-success', function () {
        console.log("Login successful.");
      });

      $rootScope.$on('event:auth-login-failure', function () {
        console.log("Login error.");
      });

      $rootScope.$on('event:auth-logout', function () {
        console.log("Logged out.");
      });

      $ionicPlatform.ready(function () {
        if ($window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    }
  ]);

})();
