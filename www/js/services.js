(function () {
  "use strict";

  var services = angular.module('spokes.services', ['restangular']);

  services.service('StreamService', ['Restangular', function (Restangular) {
    var streamAll = Restangular.all('stream');

    this.getAll = function getAll() {
      return streamAll.getList();
    };
  }]);

  services.service('UsersService', ['Restangular', function (Restangular) {
    var users = Restangular.all('users');

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

      return users.post(user).then(function (response) {
        var userId = response.id;

        var userProposals = Restangular.one('users', userId).all('proposals');
        return userProposals.post(proposal);
      });
    };

    this.getById = function (userId) {

    };

    this.edit = function (userId, userData) {

    };

    this.getNotificationsById = function (userId) {
      var userNotifications = Restangular.one('users', userId).all('notifications');
      return userNotifications.getList();
    };
  }]);

})();