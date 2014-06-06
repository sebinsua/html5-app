(function () {
  "use strict";

  var services = angular.module('spokes.services', ['restangular']);

  services.service('AuthenticationService', [
    '$window',
    '$rootScope',
    '$q',
    function ($window, $rootScope, $q) {
      var localStorage = $window.localStorage;

      var DOMAIN = "spokes.auth0.com";
      var CLIENT_ID = "VKtbT0VB0iqYMudMSmW4DKuwV1svqybM";

      var _login = function () {
        var deferred = $q.defer();

        var isAuth0PluginLoaded = !!$window.Auth0Client;
        if (isAuth0PluginLoaded) {
          var auth0 = new Auth0Client(DOMAIN, CLIENT_ID);
          auth0.login({ connection: "linkedin" }, function (err, result) {
            if (err) {
              return deferred.reject(err);
            }

            deferred.resolve(result[0]);
          });
        } else {
          var randomId = Date.now();
          deferred.resolve({
            "auth0AccessToken": "development-" + randomId,
            "idToken": "development-" + randomId,
            "profile": {}
          });
        }

        return deferred.promise;
      };

      // Get some ideas from this:
      // http://www.kdmooreconsulting.com/blogs/authentication-with-ionic-and-angular-js-in-a-cordovaphonegap-mobile-web-application/
      this.login = function () {
        console.log("Logging in...");
        return _login().then(function (currentAccountData) {
          localStorage.setItem('currentAccount', JSON.stringify(currentAccountData));
          $rootScope.$broadcast('event:auth-login-success', currentAccountData);
          return currentAccountData;
        }, function (err) {
          console.log(err);
          $rootScope.$broadcast('event:auth-login-failure');
          return false;
        });
      };

      this.linkToUser = function (userId) {
        var currentAccountString = localStorage.getItem('currentAccount');
        if (currentAccountString && currentAccountString.length) {
          var currentAccount = JSON.parse(currentAccountString);
          currentAccount.userId = userId;
          localStorage.setItem('currentAccount', JSON.stringify(currentAccount));
          console.log("currentAccount set with " + userId);
        }
        return false;
      };

      this.isLoggedIn = function () {
        // @TODO: Test token?
        return this.getCurrentAccount() !== false;
      };

      this.getCurrentAccount = function () {
        var currentAccountString = localStorage.getItem('currentAccount');
        if (currentAccountString && currentAccountString.length) {
          return JSON.parse(currentAccountString);
        }
        return false;
      };

      this.logout = function () {
        console.log("Logging out...");
        localStorage.removeItem('currentAccount');

        $rootScope.$broadcast('event:auth-logout');
      };
    }
  ]);

  services.service('ContactsService', ['$q', function ($q) {
    this.getAll = function getAll() {
      var deferred = $q.defer();
      if (navigator.contacts) {
        ionic.Platform.ready(function () {
          var options = new ContactFindOptions();

          options.filter = "";
          options.multiple = true;
          var filter = ["phoneNumbers", "displayName"];

          navigator.contacts.find(filter, function onSuccess(contacts) {
            deferred.resolve(contacts);
          }, function onError(e) {
            console.log("On fail " + e);
            deferred.reject(e);
          }, options);
        });
      } else {
        deferred.reject("PhoneGap not being used. No access to navigator.");
      }
      return deferred.promise;
    };
  }]);

  services.service('UserAuthenticationService', ['Restangular', function (Restangular) {
    this.getByAuthId = function (authId) {
      var user = Restangular.one('auth');
      return user.get({ authId: authId });
    };
  }]);

  services.service('StreamService', ['Restangular', function (Restangular) {
    var streamAll = Restangular.all('stream');

    this.getAll = function getAll() {
      return streamAll.getList();
    };
  }]);

  services.service('UsersService', ['Restangular', function (Restangular) {

    this.create = function (userData) {
      var user = {
        'authId': userData.authId,
        'name': userData.name,
        'firstName': userData.givenName,
        'lastName': userData.familyName,
        'headline': userData.headline,
        'industry': userData.industry,
        'email': userData.email,
        'country': userData.country.name,
        'gender': userData.gender.value,
        'birthDate': userData.birthDate,
        'mobileNumber': userData.mobileNumberPrefix + ' ' + userData.mobileNumber,
        'meetingPlace': userData.meetingPlace,
        'currentPositions': userData.currentPositions,
        'identities': userData.identities,
        'linkedInUrl': userData.publicProfileUrl
      };

      var proposal = {};
      if (userData.offer) {
        proposal.offer = {
          description: userData.offer
        };
      }
      if (userData.request) {
        proposal.request = {
          description: userData.request
        };
      }

      var users = Restangular.all('users');
      return users.post(user).then(function (response) {
        var userId = response.id;

        var userProposals = Restangular.one('users', userId).all('proposals');
        return userProposals.post(proposal).then(function (proposalResponse) {
          return response;
        });
      });
    };

    this.getById = function (userId) {
      var user = Restangular.one('users', userId);
      return user.get();
    };

    this.edit = function (userId, userData) {
      var user = Restangular.one('users', userId);
      return user.customPUT(userData);
    };

    this.getNotificationsById = function (userId) {
      var userNotifications = Restangular.one('users', userId).all('notifications');
      return userNotifications.getList();
    };

    this.getProposalsById = function (userId) {
      var userProposals = Restangular.one('users', userId).all('proposals');
      return userProposals.getList();
    };
  }]);

  services.service('GesturesService', ['Restangular', function (Restangular) {
    var gestures = Restangular.all('gestures');

    this.create = function create(userIdFrom, userIdTo) {
      var gesture = {
        'userId': userIdFrom,
        'nodeId': userIdTo
      };
      return gestures.post(gesture);
    };
  }]);

})();