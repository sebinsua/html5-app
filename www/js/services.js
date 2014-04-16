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
      var validatedUser = {
        'name': userData.name,
        'email': userData.email,
        'country': userData.country,
        'gender': userData.gender,
        'birthDate': userData.birthDate,
        'mobileNumber': userData.mobileNumberPrefix + ' ' + userData.mobileNumber,
        'meetingPlace': userData.meetingPlace
      };

      return users.post(validatedUser);
    };
  }]);

})();