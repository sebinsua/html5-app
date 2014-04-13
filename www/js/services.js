(function () {
  "use strict";

  var services = angular.module('spokes.services', ['restangular']);

  services.service('StreamService', ['Restangular', function (Restangular) {
    var streamAll = Restangular.all('stream');

    this.getAll = function getAll() {
      return streamAll.getList();
    };
  }]);

})();