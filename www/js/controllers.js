(function () {
  "use strict";

  var controllers = angular.module('spokes.controllers', []);

  controllers.controller('ValuePropositionCtrl', ['$scope', function ($scope) {
    console.log("Value Proposition: This is executed.");
  }]);

  controllers.controller('SignInCtrl', ['$scope', '$state', function ($scope, $state) {
    console.log("Sign In: This is executed.");

    $scope.signIn = function signIn() {
      $state.go('join.basic');
    };
  }]);

  controllers.controller('JoinBasicCtrl', ['$scope', '$state', function ($scope, $state) {
    console.log("Join Basic: This is executed.");

    $scope.next = function next() {
      $state.go('join.further');
    };
  }]);

  controllers.controller('JoinFurtherCtrl', ['$scope', '$state', function ($scope, $state) {
    console.log("Join Further: This is executed.");

    $scope.next = function next() {
      $state.go('join.proposal');
    };
  }]);

  controllers.controller('JoinProposalCtrl', ['$scope', '$state', function ($scope, $state) {
    console.log("Join Proposal: This is executed.");

    $scope.register = function next() {
      $state.go('app.stream');
    };
  }]);

  controllers.controller('ProposalCtrl', ['$scope', function ($scope) {
    console.log("Proposal: This is executed.");
  }]);

  controllers.controller('AppCtrl', ['$scope', function ($scope) {
    console.log("App: This is executed.");
  }]);

  controllers.controller('StreamCtrl', ['$scope', function ($scope) {
    console.log("Stream: This is executed.");

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