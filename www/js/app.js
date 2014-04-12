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
      .state('sign-in', {
        url: "/sign-in",
        templateUrl: "./templates/sign-in.html",
        controller: 'SignInCtrl'
      })
      .state('join', {
        abstract: true,
        url: "/join",

        template: '<ion-view/>'
      })
      .state('join.basic', {
        url: '/basic',
        templateUrl: './templates/join-basic.html',
        controller: 'JoinBasicCtrl'
      })
      .state('join.further', {
        url: '/basic',
        templateUrl: './templates/join-further.html',
        controller: 'JoinFurtherCtrl'
      })
      .state('proposal', {
        url: '/proposal',
        templateUrl: './templates/proposal.html',
        controller: 'ProposalCtrl'
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
        url: '/profile',
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
