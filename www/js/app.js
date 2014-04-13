(function () {
  "use strict";

  var spokes = angular.module('spokes', [
    'ionic',
    'restangular',
    'angularMoment',
    'spokes.services',
    'spokes.controllers'
  ]);

  spokes.constant('angularMomentConfig', {
    preprocess: 'unix', // optional
    timezone: 'Europe/London' // optional
  });

  spokes.config(['RestangularProvider', '$stateProvider', '$urlRouterProvider', function (RestangularProvider, $stateProvider, $urlRouterProvider) {
    var API_URL = 'http://spokes-api.herokuapp.com/api/';

    RestangularProvider.setBaseUrl('http://localhost:3000/api/');

    $stateProvider
      .state('value-proposition', {
        url: "/",
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
        url: '/profile',
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

  }]);

  spokes.run(['$ionicPlatform', function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }]);

})();
