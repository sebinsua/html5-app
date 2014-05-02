(function () {
  "use strict";

  var services = angular.module('spokes.services', ['restangular']);

  services.service('AuthenticationService', [
    '$rootScope',
    '$q',
    function ($rootScope, $q) {
      var localStorage = window.localStorage;

      var DOMAIN = "spokes.auth0.com";
      var CLIENT_ID = "VKtbT0VB0iqYMudMSmW4DKuwV1svqybM";

      var _login = function () {
        var deferred = $q.defer();

        var isAuth0PluginLoaded = !!window.Auth0Client;
        if (isAuth0PluginLoaded) {
          var auth0 = new Auth0Client(DOMAIN, CLIENT_ID);
          auth0.login({ connection: "linkedin" }, function (err, result) {
            if (err) {
              return deferred.reject(err);
            }

            deferred.resolve(result);
          });
        } else {
          deferred.resolve({
            "auth0AccessToken": "64eTFhviQz3glG3E",
            "idToken": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL3Nwb2tlcy5hdXRoMC5jb20vIiwic3ViIjoibGlua2VkaW58cndMNlhiQU1PeiIsImF1ZCI6IlZLdGJUMFZCMGlxWU11ZE1TbVc0REt1d1Yxc3ZxeWJNIiwiZXhwIjoxMzk5MDE0Mjk1LCJpYXQiOjEzOTg5NzgyOTV9.eCMW7q_4gelnyPMlTCbUlpDWvNXPd2MuzlLMvgUCPjY",
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
          $rootScope.$broadcast('event:auth-login-success', currentAccountData.profile);
          return currentAccountData.profile;
        }, function (err) {
          console.log(err);
          $rootScope.$broadcast('event:auth-login-failure');
          return false;
        });
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

  services.service('UserAuthenticationService', ['Restangular', function (Restangular) {
    this.getByAuthId = function (authId) {
      var user = Restangular.all('auth', { authId: authId });
      return user.get();
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
        'name': userData.name,
        'email': userData.email,
        'country': userData.country.name,
        'gender': userData.gender.value,
        'birthDate': userData.birthDate,
        'mobileNumber': userData.mobileNumberPrefix + ' ' + userData.mobileNumber,
        'meetingPlace': userData.meetingPlace
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
        return userProposals.post(proposal);
      });
    };

    this.getById = function (userId) {
      var user = Restangular.one('users', userId);
      return user.get();
    };

    this.edit = function (userId, userData) {
      var user = Restangular.one('users', userId);
      return user.put(userData);
    };

    this.getNotificationsById = function (userId) {
      var userNotifications = Restangular.one('users', userId).all('notifications');
      return userNotifications.getList();
    };
  }]);

})();