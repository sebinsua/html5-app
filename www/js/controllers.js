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

    $scope.profilePhoto = "https://pbs.twimg.com/profile_images/3583837846/345847dccc3e3bd8bd1fbed402a1f963_bigger.jpeg";

    $scope.next = function next() {
      $state.go('join.further');
    };

    $scope.getImage = function getImage() {
      var onSuccess = function (fileUri) {
        console.log(fileUri);
        $scope.profilePhoto = fileUri;
        $scope.$apply();
      };
      var onFail = function(e) {
        console.log("On fail " + e);
      };

      var options =   {
        quality: 50,
        destinationType: Camera.DestinationType.FILE_URI,
        sourceType: 0, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
        encodingType: 0 // 0=JPG 1=PNG
      };
      navigator.camera.getPicture(onSuccess, onFail, options);
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