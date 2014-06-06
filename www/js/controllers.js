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
        AuthenticationService.login().then(function (currentAccount) {
          var authId = currentAccount.idToken;
          return UserAuthenticationService.getByAuthId(authId);
        }).then(function (response) {
          console.log("response was");
          console.log(response);
          AuthenticationService.linkToUser(response.id);
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
      $scope.account.authId = currentAccount.idToken;
      $scope.account.name = currentAccount.profile.name;
      $scope.account.givenName = currentAccount.profile['given_name'];
      $scope.account.familyName = currentAccount.profile['family_name'];
      $scope.account.headline = currentAccount.profile.headline;
      $scope.account.industry = currentAccount.profile.industry;
      $scope.account.currentPositions = currentAccount.profile.positions ? _.map(currentAccount.profile.positions.values, function (position) {
        return position;
      }) : [];
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
        UsersService.create(newAccount).then(function (userResponse) {
          console.log(userResponse);
          AuthenticationService.linkToUser(userResponse.id);
          $state.go('app.stream');
        }, function (err) {
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

  controllers.controller('EditAccountCtrl', [
    '$scope',
    'AuthenticationService',
    'UsersService',
    function ($scope, AuthenticationService, UsersService) {
      console.log("Edit Account: This is executed.");

      var currentAccount = AuthenticationService.getCurrentAccount();
      var userId = currentAccount.userId;

      $scope.profilePhoto = currentAccount.picture || "https://pbs.twimg.com/profile_images/3583837846/345847dccc3e3bd8bd1fbed402a1f963_bigger.jpeg";
      $scope.genders = [
        { value: 'F', name: 'Female' },
        { value: 'M', name: 'Male' },
        { value: '-', name: 'Other' }
      ];

      console.log("userId" + userId);
      UsersService.getById(userId).then(function (user) {
        $scope.account = user;
      });

      $scope.update = function updateAccount() {
        var userData = $scope.account;

        var user = {
          'name': userData.name,
          'email': userData.email,
          'gender': userData.gender.value,
          'birthDate': userData.birthDate
        };
        return UsersService.edit(userId, user);
      };
    }
  ]);

  controllers.controller('StreamCtrl', ['$scope', 'StreamService', 'AuthenticationService', function ($scope, StreamService, AuthenticationService) {
    console.log("Stream: This is executed.");

    var currentAccount = AuthenticationService.getCurrentAccount();
    console.log(currentAccount);

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

  controllers.controller('ProfileCtrl', ['$scope', '$stateParams', 'UsersService', 'AuthenticationService', 'GesturesService', function ($scope, $stateParams, UsersService, AuthenticationService, GesturesService) {
    console.log("Profile: This is executed.");

    var currentAccount = AuthenticationService.getCurrentAccount();
    var userIdFrom = currentAccount.userId;
    var profileId = $stateParams.userId;

    var getUser = function getUser() {
      UsersService.getById(profileId).then(function (user) {
        $scope.user = user;
      });

      UsersService.getProposalsById(profileId).then(function (proposals) {
        console.log(proposals);
        $scope.proposals = proposals;
      });
    };

    getUser();

    $scope.notify = function notify() {
      return GesturesService.create(userIdFrom, userIdTo);
    };
  }]);

  controllers.controller('NotificationsCtrl', ['$scope', 'AuthenticationService', 'UsersService', function ($scope, AuthenticationService, UsersService) {
    console.log("Notifications: This is executed.");

    var currentAccount = AuthenticationService.getCurrentAccount(),
        userId = currentAccount.userId;

    var getNotifications = function getNotifications() {
      return UsersService.getNotificationsById(userId).then(function (items) {
        $scope.items = items;
      });
    };

    $scope.notifications = getNotifications().$object;
  }]);

})();