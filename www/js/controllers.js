(function () {
  "use strict";

  var controllers = angular.module('spokes.controllers', []);

  controllers.controller('LoadingScreenCtrl', [
    '$state',
    'AuthenticationService',
    function ($state, AuthenticationService) {
      if (AuthenticationService.isLoggedIn()) {
        console.log("Already logged in, so loading the stream...");
        $state.go('app.stream', {}, { location: "replace" });
      } else {
        console.log("Not logged in, so ");
        $state.go('value-proposition', {}, { location: "replace" });
      }
    }
  ]);

  controllers.controller('ValuePropositionCtrl', ['$scope', function ($scope) {
    console.log("Value Proposition: This is executed.");
  }]);

  controllers.controller('SignInCtrl', [
    '$scope',
    '$state',
    'AuthenticationService',
    'UserAuthenticationService',
    function ($scope, $state, AuthenticationService, UserAuthenticationService) {
      console.log("Sign In: This is executed.");

      $scope.signIn = function signIn() {
        AuthenticationService.login().then(function (profile) {
          var authId = profile['user_id'];
          return UserAuthenticationService.getByAuthId(authId);
        }).then(function () {
          $state.go('app.stream');
        }, function () {
          $state.go('join.basic');
        });
      };
    }
  ]);

  controllers.controller('JoinBasicCtrl', [
    '$scope',
    '$state',
    '$sce',
    'SharedData',
    'AuthenticationService',
    'ContactsService',
    function ($scope, $state, $sce, SharedData, AuthenticationService, ContactsService) {
      console.log("Join Basic: This is executed.");

      ContactsService.getAll().then(function (contacts) {
        $scope.contacts = contacts;
        $scope.$apply();
      });

      var currentAccount = AuthenticationService.getCurrentAccount();

      $scope.account = SharedData;
      $scope.account.authId = currentAccount.profile['user_id'];
      $scope.account.name = currentAccount.profile.name;
      $scope.account.givenName = currentAccount.profile['given_name'];
      $scope.account.familyName = currentAccount.profile['family_name'];
      $scope.account.headline = currentAccount.profile.headline;
      $scope.account.industry = currentAccount.profile.industry;
      $scope.account.currentPositions = _.map(currentAccount.profile.positions.values, function (position) {
        return position;
      });
      $scope.account.identities = currentAccount.profile.identities;
      $scope.account.publicProfileUrl = currentAccount.profile.publicProfileUrl;

      $scope.profilePhoto = currentAccount.profile.picture || "https://pbs.twimg.com/profile_images/3583837846/345847dccc3e3bd8bd1fbed402a1f963_bigger.jpeg";

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
    'AuthenticationService',
    function ($scope, $state, SharedData, UsersService, AuthenticationService) {

      console.log("Join Proposal: This is executed.");

      $scope.account = SharedData;

      $scope.register = function next() {
        var newAccount = $scope.account;
        console.log("yeah mate");
        console.log(newAccount);
        UsersService.create(newAccount).then(function (response) {
          AuthenticationService.linkToUser(response.id);
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

  controllers.controller('AppCtrl', ['$scope', '$ionicViewService', '$state', 'AuthenticationService', function ($scope, $ionicViewService, $state, AuthenticationService) {
    console.log("App: This is executed.");

    $scope.signOut = function signOut() {
      AuthenticationService.logout();
      // @TODO: This currently isn't clearing the view history. Not that it matters much yet.
      $ionicViewService.clearHistory();
      $state.go('value-proposition', {}, { location: "replace" });
    };
  }]);

  controllers.controller('EditAccountCtrl', ['$scope', 'UsersService', function ($scope, UsersService) {
    console.log("Edit Account: This is executed.");

    $scope.genders = [
      { value: 'F', name: 'Female' },
      { value: 'M', name: 'Male' },
      { value: '-', name: 'Other' }
    ];

    $scope.account = {};

    $scope.update = function updateAccount() {
      var userId = "1";
      var userObject = {};
      return UsersService.edit(userId, userObject).then(function (items) {
        $scope.items = items;
      });
    };
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

  controllers.controller('ProfileCtrl', ['$scope', '$stateParams', 'UsersService', function ($scope, $stateParams, UsersService) {
    console.log("Profile: This is executed.");

    var getUser = function getUser() {
      var userId = $stateParams.userId;
      return UsersService.getById(userId).then(function (user) {
        $scope.user = user;
      });
    };

    $scope.user = getUser().$object;
  }]);

  controllers.controller('NotificationsCtrl', ['$scope', 'UsersService', function ($scope, UsersService) {
    console.log("Notifications: This is executed.");

    var getNotifications = function getNotifications() {
      var userId = "1";
      return UsersService.getNotificationsById(userId).then(function (items) {
        $scope.items = items;
      });
    };

    $scope.notifications = getNotifications().$object;
  }]);

})();