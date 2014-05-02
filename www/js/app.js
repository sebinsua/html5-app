(function () {
  "use strict";

  var spokes = angular.module('spokes', [
    'ionic',
    'restangular',
    'angularMoment',
    'spokes.services',
    'spokes.factories',
    'spokes.controllers'
  ]);

  spokes.constant('angularMomentConfig', {
    preprocess: 'unix', // optional
    timezone: 'Europe/London' // optional
  });

  spokes.config([
    'RestangularProvider',
    '$stateProvider',
    '$urlRouterProvider',
    function (RestangularProvider, $stateProvider, $urlRouterProvider) {
      var API_URL = 'http://spokes-api.herokuapp.com/api/';

      RestangularProvider.setBaseUrl('http://localhost:3000/api/');

      $stateProvider
        .state('loading-screen', {
          url: "/",
          templateUrl: "./templates/loading-screen.html",
          controller: 'LoadingScreenCtrl'
        })
        .state('value-proposition', {
          url: "/value-proposition",
          templateUrl: "./templates/value-proposition.html",
          controller: 'ValuePropositionCtrl'
        })
        .state('sign-in', {
          url: "/sign-in",
          templateUrl: "./templates/sign-in.html",
          controller: 'SignInCtrl'
        })
        .state('sign-out', {
          url: "/sign-out",
          controller: 'SignOutCtrl'
        })
        .state('join', {
          url: "/join",
          abstract: true,

          templateUrl: './templates/join.html'
        })
        .state('join.basic', {
          url: '/basic',
          templateUrl: './templates/join-basic.html',
          controller: 'JoinBasicCtrl'
        })
        .state('join.further', {
          url: '/further',
          templateUrl: './templates/join-further.html',
          controller: 'JoinFurtherCtrl'
        })
        .state('join.proposal', {
          url: '/proposal',
          templateUrl: './templates/join-proposal.html',
          controller: 'JoinProposalCtrl'
        })
        .state('app', {
          url: '/app',
          abstract: true,

          templateUrl: "./templates/menu.html",
          controller: 'AppCtrl'
        })
        .state('app.edit-account', {
          url: '/account',

          views: {
            menuContent: {
              templateUrl: "./templates/edit-account.html",
              controller: 'EditAccountCtrl'
            }
          }
        })
        .state('app.proposal', {
          url: '/proposal',
          views: {
            menuContent: {
              templateUrl: './templates/proposal.html',
              controller: 'ProposalCtrl'
            }
          }
        })
        .state('app.stream', {
          url: '/stream',
          views: {
            menuContent: {
              templateUrl: "./templates/stream.html",
              controller: 'StreamCtrl'
            }
          }
        })
        .state('app.profile', {
          url: '/profile/:userId',
          views: {
            menuContent: {
              templateUrl: "./templates/profile.html",
              controller: 'ProfileCtrl'
            }
          }
        })
        .state('app.notifications', {
          url: '/notifications',
          views: {
            menuContent: {
              templateUrl: "./templates/notifications.html",
              controller: 'NotificationsCtrl'
            }
          }
        });

      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/');

    }
  ]);

  spokes.run([
    '$ionicPlatform',
    '$rootScope',
    '$state',
    'Restangular',
    'AuthenticationService',
    function ($ionicPlatform, $rootScope, $state, Restangular, AuthenticationService) {
      Restangular.setErrorInterceptor(function (response) {
        if (response.status == 401) {
          $rootScope.$broadcast('event:auth-login-required');
        }
      });

      Restangular.setFullRequestInterceptor(function (element, operation, route, url, headers, params) {
        var currentAccount = AuthenticationService.getCurrentAccount();

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
        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    }
  ]);

})();
