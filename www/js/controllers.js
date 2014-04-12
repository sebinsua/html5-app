(function () {
  "use strict";

  var controllers = angular.module('spokes.controllers', []);

  controllers.controller('LoadingScreenCtrl', ['$scope', function ($scope) {
    console.log("Loading Screen: This is executed.");
  }]);

  controllers.controller('SignInCtrl', ['$scope', function ($scope) {
    console.log("Sign In: This is executed.");
  }]);

  controllers.controller('JoinBasicCtrl', ['$scope', function ($scope) {
    console.log("Join Basic: This is executed.");
  }]);

  controllers.controller('JoinFurtherCtrl', ['$scope', function ($scope) {
    console.log("Join Further: This is executed.");
  }]);

  controllers.controller('ProposalCtrl', ['$scope', function ($scope) {
    console.log("Proposal: This is executed.");
  }]);

  controllers.controller('AppCtrl', ['$scope', function ($scope) {
    console.log("App: This is executed.");
  }]);

  controllers.controller('StreamCtrl', ['$scope', '$ionicNavBarDelegate', function ($scope, $ionicNavBarDelegate) {
    console.log("Stream: This is executed.");
    $ionicNavBarDelegate.showBackButton(false);

    $scope.items = [
      "Word",
      "Other",
      "Thing"
    ];
  }]);

  controllers.controller('ProfileCtrl', ['$scope', function ($scope) {
    console.log("Profile: This is executed.");
  }]);

  controllers.controller('NotificationsCtrl', ['$scope', function ($scope) {
    console.log("Notifications: This is executed.");
  }]);

})();