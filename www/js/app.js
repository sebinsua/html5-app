(function () {
  "use strict";

  angular.module('spokes', ['ionic', 'spokes.controllers'])

  .run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  })

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
    .state('app.loading', {
      url: "/",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/');

    console.log("hi!");
    console.log($stateProvider);
  });

})();
