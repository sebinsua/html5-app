(function () {
  "use strict";

  var services = angular.module('spokes.services', ['restangular']);

  services.service('AuthenticationService', [
    '$rootScope',
    function ($rootScope) {
      var localStorage = window.localStorage;

      // Get some ideas from this:
      // http://www.kdmooreconsulting.com/blogs/authentication-with-ionic-and-angular-js-in-a-cordovaphonegap-mobile-web-application/
      this.login = function (userData) {
        console.log("Logging in...");
        var currentAccountData = {
          userId: '1',
          authToken: 'abc'
        };
        localStorage.setItem('currentAccount', JSON.stringify(currentAccountData));

        $rootScope.$broadcast('event:auth-login-success');
        // @TODO: $rootScope.$broadcast('event:auth-login-failure');
      };

      this.isLoggedIn = function () {
        // @TODO: Test token?
        return true;
      };

      this.getCurrentAccount = function () {
        return JSON.parse(localStorage.getItem('currentAccount'));
      };

      this.logout = function () {
        console.log("Logging out...");
        localStorage.removeItem('currentAccount');

        $rootScope.$broadcast('event:auth-logout');
      };
    }
  ]);

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