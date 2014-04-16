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

  controllers.controller('SignOutCtrl', ['$scope', '$state', function ($scope, $state) {
    console.log("Sign Out: This is executed.");
  }]);

  controllers.controller('JoinBasicCtrl', [
    '$scope',
    '$state',
    '$sce',
    'SharedData',
    function ($scope, $state, $sce, SharedData) {
      console.log("Join Basic: This is executed.");

      var getContacts = function getContacts() {
        var onSuccess = function (contacts) {
          console.log(contacts);
          $scope.contacts = contacts;
          $scope.$apply();
        };
        var onFail = function (e) {
          console.log("On fail " + e);
        };

        // @TODO: This can be implemented with a promise... :)
        navigator.contacts && ionic.Platform.ready(function () {
          var options = new ContactFindOptions();

          options.filter = "";
          options.multiple = true;
          var filter = ["phoneNumbers", "displayName"];

          navigator.contacts.find(filter, onSuccess, onFail, options);
        });
      };
      getContacts();

      $scope.account = SharedData;

      $scope.profilePhoto = "https://pbs.twimg.com/profile_images/3583837846/345847dccc3e3bd8bd1fbed402a1f963_bigger.jpeg";

      $scope.genders = [
        { value: 'F', name: 'Female' },
        { value: 'M', name: 'Male' },
        { value: '-', name: 'Other' }
      ];
      $scope.countries = [
        {
          name: 'Ireland',
          phoneNumberPrefix: '+353'
        },
        {
          name: 'United Kingdom',
          phoneNumberPrefix: '+44'
        },
        {
          name: 'United States',
          phoneNumberPrefix: '+1'
        }
      ];

      $scope.$watch("account.country", function (newValue, oldValue) {
        if (newValue === oldValue) {
          return false;
        }

        var countrySelected = newValue;
        if (countrySelected) {
          $scope.account.mobileNumberPrefix = countrySelected.phoneNumberPrefix;
        }
      });

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

        if (navigator.camera) {
          ionic.Platform.ready(function () {
            var options = {
              quality: 50,
              destinationType: Camera.DestinationType.FILE_URI,
              sourceType: 0, // 0:Photo Library, 1=Camera, 2=Saved Photo Album
              encodingType: 0 // 0=JPG 1=PNG
            };
            navigator.camera.getPicture(onSuccess, onFail, options);
          });
        }
      };

      $scope.trustSrc = function trustSrc(src) {
        return $sce.trustAsResourceUrl(src);
      };
    }
  ]);

  controllers.controller('JoinFurtherCtrl', [
    '$scope',
    '$state',
    'SharedData',
    function ($scope, $state, SharedData) {
      console.log("Join Further: This is executed.");

      $scope.account = SharedData;

      $scope.next = function next() {
        $state.go('join.proposal');
      };
    }
  ]);

  controllers.controller('JoinProposalCtrl', [
    '$scope',
    '$state',
    'SharedData',
    'UsersService',
    function ($scope, $state, SharedData, UsersService) {

      console.log("Join Proposal: This is executed.");

      $scope.account = SharedData;

      $scope.register = function next() {
        var newAccount = $scope.account;
        UsersService.create(newAccount).then(function () {
          $state.go('app.stream');
        }).fail(function (err) {
          console.log(err);
        });

      };
    }
  ]);

  controllers.controller('ProposalCtrl', ['$scope', function ($scope) {
    console.log("Proposal: This is executed.");
  }]);

  controllers.controller('AppCtrl', ['$scope', function ($scope) {
    console.log("App: This is executed.");
  }]);

  controllers.controller('EditAccountCtrl', ['$scope', function ($scope) {
    console.log("Edit Account: This is executed.");
  }]);

  controllers.controller('StreamCtrl', ['$scope', 'StreamService', function ($scope, StreamService) {
    console.log("Stream: This is executed.");

    $scope.getStream = function getStream(refresh) {
      refresh = refresh || false;
      return StreamService.getAll().then(function (items) {
        $scope.items = items;

        if (refresh) {
          $scope.$broadcast('scroll.refreshComplete');
        }
      });
    };

    $scope.items = $scope.getStream().$object;
  }]);

  controllers.controller('ProfileCtrl', ['$scope', function ($scope) {
    console.log("Profile: This is executed.");
  }]);

  controllers.controller('NotificationsCtrl', ['$scope', function ($scope) {
    console.log("Notifications: This is executed.");
  }]);

})();